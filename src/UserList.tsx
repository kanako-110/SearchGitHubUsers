import { render } from "@testing-library/react";
import React from "react";
import User from "./User";

export type usersData = {
  avatar: string;
  login: string;
  html_url: string;
};

interface propsType {
  users?: usersData;
}

const UserList: React.FC<propsType> = (props) => {
  console.log(props);

  return (
    <div>
      {props.users ?
        <div>
          <img alt="avatar" src={props.users?.avatar} />
          <div> {props.users?.login} </div>
          <div> {props.users?.html_url} </div>
        </div>
        :
        <div>Result will be here... </div>
      }
    </div>
  );
};
export default UserList;
