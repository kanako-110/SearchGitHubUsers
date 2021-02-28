import React from "react";

export type usersData = {
  login: string;
  avatar_url: string;
  html_url: string;
}[];

interface usersType {
  users?: usersData;
}

const UserList: React.FC<usersType> = (props) => {
  return (
    <div>
      {props.users?.map((user) =>
        props.users ? (
          <div key={user.login}>
            <img alt="avatar" src={user.avatar_url} />
            <a href={user.html_url} target="_blank">
              {user.login}
            </a>
          </div>
        ) : (
          <div>Result will be here... </div>
        )
      )}
    </div>
  );
};
export default UserList;
