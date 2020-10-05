import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "../App.css";
import logo_light from "../img/logo2.svg";
import logo_dark from "../img/logo2_dark.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "80%",
    maxWidth: "720px",
    paddingBottom: "1rem",
  },
  img: {
    width: "75%",
    maxWidth: "240px",
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  const logo = props.state ? logo_dark : logo_light;

  return (
    <footer style={{ marginTop: "4rem" }}>
      <div className="container">
        <hr />
        <div className={classes.logo}>
          <img src={logo} alt="logo" className={classes.img} />
          <Typography>
            本ページで使用している潮汐データには、気象庁ホームページにて公開されている潮位表（天文潮位）を利用しています。
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
