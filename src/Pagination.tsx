import React, { useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";
import { usersData } from "./UserList";
import { ApiTypes } from "../types/Api";

interface AppProps {
  searchedName: string;
  totalNumber: number;
  page: number;
  addUsersData: (userInfo: usersData) => void;
  onPageButtonClick: (page: number) => void;
}

const Pagination: React.FC<AppProps> = ({
  searchedName,
  totalNumber,
  page,
  addUsersData,
  onPageButtonClick,
}) => {
  // -----👗styling-------
  const PageStyle = withStyles({
    root: {
      display: "inline-block",
    },
  })(MuiPagination);
  // --------------------

  const [usersData, setUsersData] = useState<usersData | []>([]);

  const per_page = 50;
  const setPageNumber = () => {
    if (totalNumber <= 1000 && Number.isInteger(totalNumber / per_page)) {
      //50で割った時に整数なら、その整数の答えがページ数
      return totalNumber / per_page;
    }
    if (
      totalNumber <= 1000 &&
      Number.isInteger(totalNumber / per_page) === false
    ) {
      // 小数点切り捨ての数＋１
      return Math.floor(totalNumber / per_page + 1);
    }
    if (totalNumber > 1000) {
      return 20;
    }
  };

  const onButton_click = (e: React.ChangeEvent<unknown>, page: number) => {
    onPageButtonClick(page);

    // -----------🌟Get Users Data-----------
    // 👉押したページのデータをすでに取得したことがある場合、ローカルのデータから情報取得する
    //  = if(userDataの中に、①item.page === 押したページ数　&& ②　item.searchedName ===検索した名前　の両方を持つものがある
    if (
      usersData.some(
        (item) => item.page === page && item.searchedName === searchedName
      )
    ) {
      const thisPageData = usersData.filter((item) => item.page === page);
      addUsersData(
        thisPageData.map((item) => ({
          login: item.login,
          avatar_url: item.avatar_url,
          html_url: item.html_url,
          page: page,
          searchedName: searchedName,
        }))
      );
    }
    // 👉それ以外(この検索ネームでこのページが初めての時)は全てAPIから取得
    else {
      axios
        .get("https://api.github.com/search/users", {
          params: {
            q: searchedName,
            page: page,
            per_page: 50,
          },
        })
        .then((resp) => {
          const matchedData = resp.data.items.filter(
            (item: ApiTypes) => item.login.indexOf(searchedName) >= 0
          );
          const dataWithPage = matchedData.map((item: ApiTypes) => ({
            login: item.login,
            avatar_url: item.avatar_url,
            html_url: item.html_url,
            page: page,
            searchedName: searchedName,
          }));
          addUsersData(dataWithPage);
          setUsersData([...usersData, ...dataWithPage]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // ----------------------
  };

  return (
    <div style={{ textAlign: "center" }}>
      <PageStyle
        count={setPageNumber()}
        color="primary"
        page={page}
        onChange={onButton_click}
        size="large"
      />
    </div>
  );
};
export default Pagination;
