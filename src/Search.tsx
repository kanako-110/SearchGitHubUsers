import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usersData } from "./UserList";
import { Octokit } from "@octokit/core";
import axios from "axios";
import { LOADIPHLPAPI } from "dns";

// TODO
// LOOKS
// if its necesarry, render "result will be here" when undefined

interface AppProps {
  addUserData: (userInfo: usersData) => void;
  passUserName: (searchedName: string) => void;
  passTotalNumber: (page: number) => void;
}

interface FormData {
  userName: string;
}

const Search: React.FC<AppProps> = ({
  addUserData,
  passUserName,
  passTotalNumber,
}) => {
  const { register, handleSubmit, errors, reset } = useForm<FormData>();
  const octokit = new Octokit({
    auth: `cad3ef8291154154d3947ebb59788953898ccdeb`,
  });

  const onForm_submit = async (data: FormData) => {
    const response = await octokit.request("GET /search/users", {
      q: data.userName,
      page: 1,
      per_page: 50,
    });
    console.log(response);

    const matchedData = response.data.items.filter(
      (item) => item.login.indexOf(data.userName) >= 0
    );

    // Question: apiからのdataを全て受け取り、全てonSubmitに渡して、それを＠userListで型宣言できないのか？
    // https://docs.github.com/en/rest/reference/search#search-users にある取得データを全てコピーして全てにstringとか書いていく？
    addUserData(
      matchedData.map((item) => ({
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
      }))
    );
    passUserName(data.userName);
    passTotalNumber(response.data.total_count);

    reset();
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

export default Search;
