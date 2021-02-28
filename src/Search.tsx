import React from "react";
import { useForm } from "react-hook-form";
import { usersData } from "./UserList";
import { Octokit } from "@octokit/core";

// TODO
// STILL I CAN HAVE ONLY 30 AT MOST? WHEN I RECEIVE FROM API
// LOOKS
// have page if its too many

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

  const onForm_submit = async (data: FormData) => {
    console.log(data.userName);

    console.log("onFormSubmit");

    const response = await octokit.request("GET /search/users", {
      q: data.userName,
    });

    const matchedData = response.data.items.filter(
      (item) => item.login.indexOf(data.userName) >= 0
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

  return (
    <form onSubmit={handleSubmit(onForm_submit)}>
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
