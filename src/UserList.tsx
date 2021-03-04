import React from "react";
import styled from "@emotion/styled";

export type usersData = {
  login: string;
  avatar_url: string;
  html_url: string;
}[];

interface usersType {
  users?: usersData;
  totalNumber: number; //まとめられる？
}

const Container = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const ItemContainer = styled("div")`
  width: 20%;
`;

const Img = styled("img")`
  width: 100%;
`;

const UserList: React.FC<usersType> = ({ users, totalNumber }) => {
  const displayOnDeskTop = () => {
    if (users && users?.length > 0) {
      return users.map((user) => {
        return (
          <ItemContainer key={user.login}>
            <Img alt="avatar" src={user.avatar_url} />
            <a href={user.html_url} target="_blank">
              {user.login}
            </a>
          </ItemContainer>
        );
      });
    }
    if (users?.length === 0) {
      return <div>当てはまるユーザーがいません</div>;
    }
  };

  return <Container>{displayOnDeskTop()}</Container>;
};
export default UserList;
