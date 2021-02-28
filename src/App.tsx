import React, { useState } from "react";
import Seacrch from "./Search";
import UserList, { usersData } from "./UserList"; //普通のexportだけだと{}

const App: React.FC = () => {
  const [users, setUsers] = useState<usersData | undefined>(undefined);
  const addUserData = (userInfo: usersData) => {
    setUsers(userInfo);
  };

  return (
    <div className="App">
      <Seacrch onSubmit={addUserData} />
      <UserList users={users} />
    </div>
  );
};

export default App;

// create next app
