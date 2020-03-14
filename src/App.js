import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Home from "./component/Home.js";
import NotFound from "./component/NotFound.js";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import TideGrapph from "./component/TideGrapph.js";
import pointdata from "./point.json";
import colorPallet from "./colorPallet.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colorPallet.dark,
      original: colorPallet.main,
      contrastText: colorPallet.txt
    }
  },
  typography: {
    fontFamily: ['"M PLUS 1p"', "-apple-system", "sans-serif"].join(","),
    fontSize: 15
  },
  navbar: {
    height: "7.5vh",
    logoHeight: "5.5vh"
  }
});

const App = () => (
  <BrowserRouter>
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <main>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              {pointdata.list.map(name => (
                <Route
                  key={name}
                  exact
                  path={"/" + pointdata[name].point}
                  render={() => <TideGrapph point={pointdata[name].point} />}
                />
              ))}
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  </BrowserRouter>
);

export default App;
