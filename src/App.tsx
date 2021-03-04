import React, { useState } from "react";
import Search from "./Search";
import UserList, { usersData } from "./UserList"; //普通のexportだけだと{}
import Pagination from "./Pagination";

const App: React.FC = () => {
  const [users, setUsers] = useState<usersData | undefined>(undefined);
  const [searchedName, setSearchedName] = useState<string>("");
  const [totalNumber, setTotalNumber] = useState(0);

  const addUserData = (userInfo: usersData) => {
    setUsers(userInfo);
  };

  const passUserName = (name: string) => {
    setSearchedName(name);
  };

  const passTotalNumber = (page: number) => {
    setTotalNumber(page);
  };

  return (
    <div className="App">
      <Search
        addUserData={addUserData}
        passUserName={passUserName}
        passTotalNumber={passTotalNumber}
      />
      <UserList users={users} totalNumber={totalNumber} />
      {totalNumber > 50 ? (
        <Pagination
          addUserData={addUserData}
          searchedName={searchedName}
          totalNumber={totalNumber}
        />
      ) : null}
    </div>
  );
};

export default App;

// create next app
