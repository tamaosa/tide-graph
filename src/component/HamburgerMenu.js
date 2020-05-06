import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import logo_light from "../img/logo2.svg";
import logo_dark from "../img/logo2_dark.svg";
import pointdata from "../point.json";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(0.5),
  },
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "64px",
  },
}));

export default function HamburgerMenu(props) {
  const classes = useStyles();
  const logo = props.state ? logo_dark : logo_light;
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });
  const toggleDrawer = (side, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        classes={{ paper: classes.paper }}
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Toolbar>
          <Link href={"/"}>
            <img src={logo} alt="logo" className={classes.img} />
          </Link>
        </Toolbar>
        <Divider />
        <List onClick={toggleDrawer("left", false)}>
          <Link href="/map" color="inherit">
            <ListItem button>
              <Typography gutterBottom>地図を表示</Typography>
            </ListItem>
          </Link>
          <Divider />
          {pointdata.region.list.map((region, i) => (
            <div key={region}>
              <Link href={`/${pointdata.region.point[i]}`} color="inherit">
                <ListItem button>
                  <Typography>{region}</Typography>
                </ListItem>
              </Link>
            </div>
          ))}
        </List>
        <Divider />
        <ListItem>
          <Typography variant="body2">&copy;Tamaosa</Typography>
        </ListItem>
      </SwipeableDrawer>
    </div>
  );
}
