import { render } from "@testing-library/react";
import React from "react";
import User from "./User";


export type usersData = {
  login: string;
  avatar_url: string;
  html_url: string;
}[];

interface usersType {
  users?: usersData;
}




const UserList: React.FC<usersType> = (props)=> {


  return (
    <div>
      {props.users ?
        <div>
          {/* <img alt="avatar" src={props.users?.avatar_url} />
          <div> {props.users?.login} </div>
          <div> {props.users?.html_url} </div> */}
        </div>
        :
        <div>Result will be here... </div>
      }
    </div>
  );
};
export default UserList;
