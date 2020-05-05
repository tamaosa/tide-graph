import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import MapPoint from "../component/MapPoint";
import pointdata from "../point.json";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Region(props) {
  const classes = useStyles();

  return (
    <div className="App-contents">
      <h1>{props.name}</h1>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {pointdata.region[props.name].map((city, i) => (
            <Grid item xs={6} sm={4} lg={2} key={city}>
              <Link href={`/${pointdata[city].point}`} color="inherit">
                <Paper elevation={0} className={classes.paper}>
                  <Typography>{city}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="map-content">
        <p>周辺地域</p>
        <MapPoint data={[props.lat, props.lon]} zoom={8} />
      </div>
    </div>
  );
}
