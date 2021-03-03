import React from "react";

export type usersData = {
  login: string;
  avatar_url: string;
  html_url: string;
}[];

interface usersType {
  users?: usersData;
  totalNumber: number; //まとめられる？
}

const UserList: React.FC<usersType> = ({ users, totalNumber }) => {
  const displayOnDeskTop = () => {
    if (users && users?.length > 0) {
      return (
        <div>
          {users?.map((user) => (
            <div key={user.login}>
              <img alt="avatar" src={user.avatar_url} />
              <a href={user.html_url} target="_blank">
                {user.login}
              </a>
            </div>
          ))}
        </div>
      );
    }
    if (users?.length === 0) {
      return <div>当てはまるユーザーがいません</div>;
    }
  };

  return <div>{displayOnDeskTop()}</div>;
};
export default UserList;

// users.map((user) => {

//   return (
//     <div key={user.login}>
//       <img alt="avatar" src={user.avatar_url} />
//       <a href={user.html_url} target="_blank">
//         {user.login}
//       </a>
//     </div>
//   );
// });

// return (
//   <div>
//     {displayOnDeskTop()}
//     {/* {users?.map((user) =>
//       users.length > 0 ? (
//         <div key={user.login}>
//           <img alt="avatar" src={user.avatar_url} />
//           <a href={user.html_url} target="_blank">
//             {user.login}
//           </a>
//         </div>
//       ) : (
//         <div>それ以外</div>
//       )
//     )} */}
//   </div>
// );

// -----------正しいやつ
// if (users && users?.length > 0) {
//   return (
//     <div>
//       {users?.map((user) => (
//         <div key={user.login}>
//           <img alt="avatar" src={user.avatar_url} />
//           <a href={user.html_url} target="_blank">
//             {user.login}
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// ーーーーーー
