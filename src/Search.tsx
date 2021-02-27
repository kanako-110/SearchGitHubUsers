import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { usersData } from "./UserList";
import { Octokit } from "@octokit/core";

interface onSubmit {
  onSubmit: (userInfo: usersData) => void;
}

interface FormData {
  userName: string;
}

const Seacrch: React.FC<onSubmit> = () => {
  const { register, handleSubmit, errors, reset } = useForm<FormData>();
  const octokit = new Octokit({
    auth: `cad3ef8291154154d3947ebb59788953898ccdeb`,
  });

  const onForm_submit = async () => {
    console.log(
      await octokit.request("GET /search/users", {
        q: "kanako",
      })
    );
  };

  // jsonについて
  // filter

  onForm_submit();

  return (
    <form onSubmit={onForm_submit}>
      <label>Search User</label>
      <input name="userName" ref={register({ required: true })} />
      {errors.userName && (
        <div className="error">ユーザー名を入力してください.</div>
      )}
      <button type="submit">Search</button>
    </form>
  );
};

export default Seacrch;

//userNameをResultに渡す
// onFormSubmitではこのままuserNameをセット。でもそのセットの目的は「App」に渡すこと。
// ここではAPpのコールバックに渡す
// Appでここで行っている、userに入れる行為、resetを行う
// then AppにuserNameの内容が飛ぶ。Resultで使えるようになる

// const onForm_submit = handleSubmit(({ userName }) => {

// axios.get(`https://api.github.com/users`).then((resp) => {
//   props.onSubmit({
//     avatar: resp.data.avatar_url,
//     login: resp.data.login,
//     html_url: resp.data.html_url,
//   });
//   console.log(resp.data);

//   console.log({
//     avatar: resp.data.avatar_url,
//     login: resp.data.login,
//     html_url: resp.data.html_url,
//   });
// });
// props.setUserName(userName)
//   reset();
// });
