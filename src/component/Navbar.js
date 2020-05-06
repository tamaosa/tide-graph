import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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

export default function Navbar(props) {
  const state = props.state;
  const handleChange = (event) => {
    localStorage.setItem("prefersDarkMode", !state);
    props.setState(!state);
  };
  const classes = useStyles();
  const logo = state ? logo_dark : logo_light;

  return (
    <nav>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <HamburgerMenu state={state} />
          <div className={classes.logo}>
            <Link href={"/"}>
              <img src={logo} alt="logo" className={classes.img} />
            </Link>
          </div>
          <FormControlLabel
            control={
              <Switch checked={state} onChange={handleChange} color="primary" />
            }
            label=""
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </nav>
  );
}
