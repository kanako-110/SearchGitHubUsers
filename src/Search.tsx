import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usersData } from "./UserList";
import { Octokit } from "@octokit/core";

interface onSubmit {
  onSubmit: (userInfo: usersData) => void;
}

interface FormData {
  userName: string;
}

const Seacrch: React.FC<onSubmit> = ({ onSubmit }) => {
  const { register, handleSubmit, errors, reset } = useForm<FormData>();
  const octokit = new Octokit({
    auth: `cad3ef8291154154d3947ebb59788953898ccdeb`,
  });

  const onForm_submit = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("onFormSubmit");

    const response = await octokit.request("GET /search/users", {
      q: "kanako",
    });

    const matchedData = response.data.items.filter(
      (item) => item.login.indexOf("kanako") >= 0
    );
    console.log(matchedData);

    // Question: apiからのdataを全て受け取り、全てonSubmitに渡して、それを＠userListで型宣言できないのか？
    onSubmit(
      matchedData.map((item) => ({
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
      }))
    );
  };

  // const onForm_submit = async () => {
  //  console.log("onFormSubmit");

  // const response = await octokit.request("GET /search/users", {
  //   q: "kanako",
  // });

  // const matchedData = response.data.items.filter(
  //   (item) => item.login.indexOf("kanako") >= 0
  // );
  // console.log(matchedData);

  //   onSubmit(
  //     matchedData.map((item) => ({
  //       login: item.login,
  //       avatar_url: item.avatar_url,
  //       html_url: item.html_url,
  //     }))
  //   );

  // };

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
