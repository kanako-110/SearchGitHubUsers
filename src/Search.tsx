import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { usersData } from "./UserList";
import styled from "@emotion/styled";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ApiTypes } from "./Types";

interface AppProps {
  addUserData: (userInfo: usersData) => void;
  passUserName: (searchedName: string) => void;
  passTotalNumber: (page: number) => void;
  pushToFirstPage: (page: number) => void;
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
  pushToFirstPage,
}) => {
  const { register, handleSubmit, reset, errors } = useForm<FormData>();

  const onForm_submit = (data: FormData) => {
    axios
      .get("https://api.github.com/search/users", {
        params: {
          q: data.userName,
          page: 1,
          per_page: 50,
        },
      })
      .then((resp) => {
        const matchedData = resp.data.items.filter(
          (item: ApiTypes) => item.login.indexOf(data.userName) >= 0
        );
        addUserData(
          matchedData.map((item: ApiTypes) => ({
            login: item.login,
            avatar_url: item.avatar_url,
            html_url: item.html_url,
            page: 1,
            searchedName: data.userName,
          }))
        );
        passUserName(data.userName);
        passTotalNumber(resp.data.total_count);
      })
      .catch((err) => {
        console.log(err);
      });
    pushToFirstPage(1);
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
