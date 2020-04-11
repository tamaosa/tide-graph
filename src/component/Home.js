import React from "react";
import RegionRoll from "./RegionRoll";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.theme,
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <div className="title-content">
        <div className="title-text">
          <h1>Tidey</h1>
          <p>とにかく「シンプル」なタイドグラフ</p>
        </div>
      </div>
      <div className="explanation-content">
        <p>
          Tideyでは全国237地点のシンプルなタイトグラフを配信しています。釣り
          <span role="img" aria-label="fishing">
            🎣
          </span>
          やサーフィン
          <span role="img" aria-label="surfing">
            🏄
          </span>
          のお供にぜひどうぞ。
        </p>
      </div>
      <h3>地図から探す</h3>
      <div className={classes.root}>
        <Button variant="outlined" color="inherit" href="/map">
          地図を表示する
        </Button>
      </div>
      <h3>地域から探す</h3>
      <div className="region-content">
        <RegionRoll />
      </div>
    </div>
  );
}
