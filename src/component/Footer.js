import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import "../App.css";
import logo_light from "../img/logo2.svg";
import logo_dark from "../img/logo2_dark.svg";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "80%",
    maxWidth: "720px",
  },
  img: {
    width: "75%",
    maxWidth: "240px",
  },
  contact: {
    textAlign: "right",
    paddingBottom: "1rem",
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
        <div className={classes.contact}>
          <Typography>
            Contact&nbsp;
            <Link
              href="https://twitter.com/tamaki_osamu"
              target="_blank"
              rel="noopener noreferrer"
              alt="twitter"
            >
              @Tamaosa
            </Link>
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
