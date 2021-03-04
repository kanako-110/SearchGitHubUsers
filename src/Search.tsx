import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usersData } from "./UserList";
import { Octokit } from "@octokit/core";
import styled from "@emotion/styled";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

// TODO
//🌟 LOOKS
// if its necesarry, render "result will be here" when undefined

interface AppProps {
  addUserData: (userInfo: usersData) => void;
  passUserName: (searchedName: string) => void;
  passTotalNumber: (page: number) => void;
}

interface FormData {
  userName: string;
}

const Container = styled("div")`
  text-align: center;
`;

const Title = styled("h1")`
  font-family: "Alegreya Sans", sans-serif;
  font-size: 3rem;
  margin: 3% 0;
`;

const Search: React.FC<AppProps> = ({
  addUserData,
  passUserName,
  passTotalNumber,
}) => {
  const { register, handleSubmit,  reset } = useForm<FormData>();
  const octokit = new Octokit({
    auth: `cad3ef8291154154d3947ebb59788953898ccdeb`,
  });

  const onForm_submit = async (data: FormData) => {
    const response = await octokit.request("GET /search/users", {
      q: data.userName,
      page: 1,
      per_page: 50,
    });

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
      <Container>
        <Title>Search GitHub Users</Title>
        <TextField
          inputRef={register}
          name="userName"
          id="outlined-basic"
          label="UserName"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: "5%" }}
        />
      </Container>
    </form>
  );
};

export default Search;
