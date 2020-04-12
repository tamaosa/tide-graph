import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import pointdata from "./point.json";
import colorPallet from "./colorPallet.js";

import createHistory from "history/createBrowserHistory";
import ReactGA from "react-ga";

const Home = lazy(() => import("./routes/Home"));
const FullMap = lazy(() => import("./routes/FullMap"));
const Region = lazy(() => import("./routes/Region"));
const TideGrapph = lazy(() => import("./routes/TideGrapph"));
const NotFound = lazy(() => import("./routes/NotFound"));

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
              <Suspense
                fallback={
                  <div className="simple-content">
                    {/* <div className="loader">Loading...</div> */}
                  </div>
                }
              >
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/map" component={FullMap} />
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
              </Suspense>
            </main>
            <Footer />
          </ThemeProvider>
        </div>
      </Router>
    );
  }
}
