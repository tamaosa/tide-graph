import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import pointdata from "./point.json";
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

export default function App() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(
    localStorage.getItem("prefersDarkMode") === "true"
  );

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#0094fa",
          },
          secondary: {
            main: prefersDarkMode ? "#282e34" : "#0094fa",
          },
          info: {
            main: prefersDarkMode ? "#d3fbd8" : "#ef5d8b",
          },
          text: {
            primary: prefersDarkMode ? "#f4f9ff" : "#3f4756",
          },
          background: {
            default: prefersDarkMode ? "#282c34" : "#ffffff",
          },
        },
        typography: {
          fontFamily: ['"M PLUS 1p"', "-apple-system", "sans-serif"].join(","),
          fontSize: 15,
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <div>
          <Navbar state={prefersDarkMode} setState={setPrefersDarkMode} />
          <main>
            <Suspense fallback={<div className="simple-content"></div>}>
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
                      render={() => <TideGrapph data={pointdata[name]} />}
                    />
                  ))}
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Suspense>
          </main>
          <Footer state={prefersDarkMode} />
        </div>
      </Router>
    </ThemeProvider>
  );
}
