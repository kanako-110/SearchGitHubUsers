import React, { useState } from "react";
import Search from "./Search";
import UserList, { usersData } from "./UserList";
import Pagination from "./Pagination";

const App: React.FC = () => {
  const [users, setUsers] = useState<usersData | undefined>(undefined);
  const [searchedName, setSearchedName] = useState<string>("");
  const [totalNumber, setTotalNumber] = useState(0);

  const addUsersData = (userInfo: usersData) => {
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
        addUserData={addUsersData}
        passUserName={passUserName}
        passTotalNumber={passTotalNumber}
      />
      <UserList users={users} />
      {totalNumber > 50 ? (
        <Pagination
          addUsersData={addUsersData}
          searchedName={searchedName}
          totalNumber={totalNumber}
        />
      ) : null}
    </div>
  );
};

export default App;

// create next app
