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
    const response = await octokit.request("GET /search/users", {
      q: "kanako",
    });

    const items = response.data.items;


    const matchedData =  response.data.items.filter(
      (item) => item.login.indexOf("kanako") >= 0
    );
    console.log(matchedData);
    
    

  };

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

