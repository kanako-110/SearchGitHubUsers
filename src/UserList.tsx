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
  width: 18%;
  padding: 1%;
`;

const Img = styled("img")`
  width: 100%;
`;

const breakpoint = 767;
const UserName = styled("a")`
  display: block;
  text-align: center;
  width: 100%;
  color: #424242;
  text-decoration: none;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    color: #81daf5;
  }
  @media (max-width: ${breakpoint}px) {
    font-size: 0.8rem;
  }
`;

const UserList: React.FC<usersType> = ({ users, totalNumber }) => {
  const displayOnDeskTop = () => {
    if (users && users?.length > 0) {
      return users.map((user) => {
        return (
          <ItemContainer key={user.login}>
            <Img alt="avatar" src={user.avatar_url} />
            <UserName href={user.html_url} target="_blank">
              {user.login}
            </UserName>
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
