import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";
import { Octokit } from "@octokit/core";
import { usersData } from "./UserList";

interface AppProps {
  addUsersData: (userInfo: usersData) => void;
  searchedName: string;
  totalNumber: number;
}

const Pagination: React.FC<AppProps> = ({
  addUsersData,
  searchedName,
  totalNumber,
}) => {
  // -----styling-------
  const PageStyle = withStyles({
    root: {
      display: "inline-block",
    },
  })(MuiPagination);
  // --------------------

  const [page, setPage] = useState(1);
  const [usersData, setUsersData] = useState<usersData | []>([]);
  const octokit = new Octokit({
    auth: `abce6e13570e9da1c036837499204a63d8f505c7`,
  });

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

  const onButton_click = async (
    e: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);

    //👉 if(userData.page(key名)にそのページが含まれていない時===まだ一回もこのページを開いてない時)、apiからfetch
    if (!usersData.some((item) => item.page === page)) {
      console.log("初めてこのページクリック");
      // ----get data for each pages, when clicking button
      const response = await octokit.request("GET /search/users", {
        q: searchedName,
        page: page,
        per_page: 50,
      });

      const matchedData = response.data.items.filter(
        (item) => item.login.indexOf(searchedName) >= 0
      );

      const dataWithPage = matchedData.map((item) => ({
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
        page: page,
      }));
      addUsersData(dataWithPage);
      setUsersData([...usersData, ...dataWithPage]);
    } //👉if(すでにそのページの情報をfetchしたことがある===そのページ数をuserDataが含んでいる場合)
    if (usersData.some((item) => item.page === page)) {
      console.log("すでにこのページに来たことあり");
      const thisPageData = usersData.filter((item) => item.page === page);
      addUsersData(
        thisPageData.map((item) => ({
          login: item.login,
          avatar_url: item.avatar_url,
          html_url: item.html_url,
          page: page,
        }))
      );
    }
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
