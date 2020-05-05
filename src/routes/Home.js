import React from "react";
import RegionRoll from "../component/RegionRoll";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    color: theme.palette.info.main,
    margin: 0,
  },
  content: {
    marginTop: "2rem",
  },
  mapButton: {
    textAlign: "center",
    marginTop: "1rem",
  },
  regionRoll: {
    marginTop: "1rem",
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <div className="title-content">
        <div className={classes.title}>
          <Typography variant="h1">Tidey</Typography>
          <Typography variant="subtitle1">
            とにかく「シンプル」なタイドグラフ
          </Typography>
        </div>
      </div>
      <div>
        <Typography>
          Tideyでは全国237地点のシンプルなタイトグラフを配信しています。釣り
          <span role="img" aria-label="fishing">
            🎣
          </span>
          やサーフィン
          <span role="img" aria-label="surfing">
            🏄
          </span>
          のお供にぜひどうぞ。
        </Typography>
      </div>
      <div className={classes.content}>
        <Typography variant="h5">地図から探す</Typography>
        <div className={classes.mapButton}>
          <Button variant="outlined" color="primary" href="/map" size="large">
            地図を表示する
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <Typography variant="h5">地域から探す</Typography>
        <div className={classes.regionRoll}>
          <RegionRoll />
        </div>
      </div>
    </div>
  );
}
