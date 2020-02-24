import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";
import TideGrapph from "./component/TideGrapph.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#454754",
      dark: "#282c34",
      contrastText: "#f4f9ff"
    }
  },
  typography: {
    fontFamily: ['"M PLUS 1p"', "-apple-system", "sans-serif"].join(","),
    fontSize: 15
  }
});

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <Navbar />
      <main className="App-main">
        <div className="container">
          <TideGrapph point="A0" />
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  </div>
);

export default App;
