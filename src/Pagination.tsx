import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiPagination from "@material-ui/lab/Pagination";
import { Octokit } from "@octokit/core";
import { usersData } from "./UserList";

interface AppProps {
  addUserData: (userInfo: usersData) => void;
  searchedName: string; //まとめられる？
  totalNumber: number;
}

const Pagination: React.FC<AppProps> = ({
  addUserData,
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
  const octokit = new Octokit({
    auth: `cad3ef8291154154d3947ebb59788953898ccdeb`,
  });

  console.log("total: " + totalNumber);

  const setPageNumber = () => {
    if (totalNumber <= 1000 && Number.isInteger(totalNumber / 50)) {
      //50で割った時に整数なら、その整数の答えがページ数
      return totalNumber / 50;
    }
    if (totalNumber <= 1000 && Number.isInteger(totalNumber / 50) === false) {
      // 小数点切り捨ての数＋１
      return Math.floor(totalNumber / 50 + 1);
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

    // ----get data for each pages, when clicking button
    const response = await octokit.request("GET /search/users", {
      q: searchedName,
      page: page,
      per_page: 50,
    });
    console.log(response);

    const matchedData = response.data.items.filter(
      (item) => item.login.indexOf(searchedName) >= 0
    );

    addUserData(
      matchedData.map((item) => ({
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
      }))
    );
  };

  return (
    <div>
      <PageStyle
        count={setPageNumber()}
        color="primary"
        onChange={onButton_click}
        page={page}
      />
    </div>
  );
};
export default Pagination;
