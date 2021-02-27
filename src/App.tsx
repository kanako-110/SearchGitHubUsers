import React, { useState } from "react";
import Seacrch from "./Search";
import UserList, { usersData } from "./UserList"; //普通のexportだけだと{}

const App: React.FC = () => {
  const [users, setUsers] = useState<usersData | undefined>(undefined);

  // const setUserName = (value: string) => {
  //   console.log("from App" + value);
  //   return set_userName(value);
  // };

  const addUserData = (userInfo: usersData) => {
    console.log(userInfo);

    setUsers(userInfo);
  };

  console.log(users);

  return (
    <div className="App">
      
      <Seacrch onSubmit={addUserData} />
      <UserList users={users} />
    </div>
  );
};

export default App;

// create next app
