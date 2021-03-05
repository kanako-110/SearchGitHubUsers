import React from "react";
import { useForm } from "react-hook-form";
import { usersData } from "./UserList";
import { Octokit } from "@octokit/core";
import styled from "@emotion/styled";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  const { register, handleSubmit, reset, errors } = useForm<FormData>();
  const octokit = new Octokit({
    auth: `abce6e13570e9da1c036837499204a63d8f505c7`,
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

    addUserData(
      matchedData.map((item) => ({
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
        page: 1,
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
          inputRef={register({ required: true })}
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
        {errors.userName && <p>ユーザー名を入力してください🙇‍♂️🙇‍♀️</p>}
      </Container>
    </form>
  );
};

export default Search;
