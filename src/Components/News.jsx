import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./../CSS/News.css";
import { Avatar, CardHeader } from "@material-ui/core";
import { Pagination } from "@mui/material";

export const News = () => {
  let [news, setNews] = useState([]);
  let [page, setPage] = useState(1);
  const APIKEY = "v6XT4C4CQlETbtXuYexSDwQOwgxEXrUplR_t3h81F9k";
  useEffect(() => {
    const getData = async () => {
      let config = {
        headers: {
          "x-api-key": `${APIKEY}`,
        },
        params: {
          q: "natural gas price",
          lang: "en",
          sort_by: "date",
          page: page,
          search_in: "title",
          page_size: "20",
        },
      };
      const latestNews = await axios.get(
        `https://api.newscatcherapi.com/v2/search`,
        config
      );
      console.log(latestNews);
      setNews(latestNews.data.articles);
    };
    getData();
  }, [page]);
  news = news?.filter(
    (v, i, a) =>
      a.findIndex(
        (v2) => (v2.title === v.title) & (v.summary !== "") & (v.author !== "")
      ) === i
  );
  news = news?.slice(0, 12);
  console.log(news);

  const formateTextData = (s, size) => {
    if (s.length > size) {
      return s.slice(0, size) + "....";
    }
    return s;
  };
  const callApiForNextPage = (event, value) => {
    setPage(value);
  };
  return (
    <div className="news">
      <header className="header">
        <h2>News</h2>
      </header>
      <hr />
      <div className="each_news">
        {news?.map((n, i) => {
          return (
            <Card sx={{ maxWidth: 300 }} key={i} className="my_card">
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe">
                    <img src={n.media} alt="logo" />
                  </Avatar>
                }
                title={formateTextData(n.title, 80)}
                subheader={n.published_date}
              />
              <CardContent className="summary">
                <Typography variant="body2" color="text.secondary">
                  {formateTextData(n.summary, 250)}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={n.link} rel="noreferrer" target="_blank" size="small">
                  More Info
                </a>
              </CardActions>
            </Card>
          );
        })}
        <div className="pagination">
          <Pagination
            count={5}
            page={page}
            onChange={callApiForNextPage}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};
