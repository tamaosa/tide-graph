import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Home from "./component/Home.js";
import NotFound from "./component/NotFound.js";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import TideGrapph from "./component/TideGrapph.js";
import Region from "./component/Region.js";
import MapPoint from "./component/MapPoint.js";
import pointdata from "./point.json";
import colorPallet from "./colorPallet.js";

import createHistory from "history/createBrowserHistory";
import ReactGA from "react-ga";

const history = createHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colorPallet.dark,
      original: colorPallet.main,
      contrastText: colorPallet.txt,
      theme: colorPallet.theme,
    },
  },
  typography: {
    fontFamily: ['"M PLUS 1p"', "-apple-system", "sans-serif"].join(","),
    fontSize: 15,
  },
  navbar: {
    height: "7.5vh",
    logoHeight: "80%",
  },
});

const Map = () => (
  <div
    style={{
      width: "100%",
      height: "100vh",
    }}
  >
    <MapPoint data={[36, 138]} zoom={5} operation={true} />
  </div>
);

export default class App extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Navbar />
            <main>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/map" component={Map} />
                  {pointdata.region.list.map((region, i) => (
                    <Route
                      key={region}
                      exact
                      path={`/${pointdata.region.point[i]}`}
                      render={() => (
                        <Region
                          name={region}
                          lat={pointdata.region.lat[i]}
                          lon={pointdata.region.lon[i]}
                        />
                      )}
                    />
                  ))}
                  {pointdata.list.map((name) => (
                    <Route
                      key={name}
                      exact
                      path={"/" + pointdata[name].point}
                      render={() => (
                        <TideGrapph point={pointdata[name].point} />
                      )}
                    />
                  ))}
                  <Route component={NotFound} />
                </Switch>
              </div>
            </main>
            <Footer />
          </ThemeProvider>
        </div>
      </Router>
    );
  }
}
