import React, {useEffect} from "react";

// type userNameProps = {
//   userName: string;
// };

type propsFromList = {
  props: string
}

const Result: React.FC<propsFromList>= (props) => {



  return (
    <div>
      {/* <img alt="avatar" src={props.avatar_url} /> */}
      {/* <div> {props.userName} </div> */}
      {/* <div> {props.blog} </div> */}
    </div>
  )
};

export default Result;
