import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import logo_light from "../img/logo1.svg";
import logo_dark from "../img/logo1_dark.svg";
import HamburgerMenu from "./HamburgerMenu.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
  },
  img: {
    height: "36px",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const logo = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? logo_dark
    : logo_light;

  return (
    <nav>
      <AppBar position="fixed">
        <Toolbar>
          <HamburgerMenu />
          <div className={classes.logo}>
            <Link href={"/"}>
              <img src={logo} alt="logo" className={classes.img} />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.toolbar} />
    </nav>
  );
}
