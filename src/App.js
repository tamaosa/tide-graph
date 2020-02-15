import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import MyResponsiveLine from "./component/MyResponsiveLine.js";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";

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
const now = new Date();

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <Navbar />
      <main className="App-main">
        <div className="container">
          <h1 className="App-title">
            <span style={{ fontSize: "2em" }}>金沢</span>のタイトグラフ
          </h1>
          <MyResponsiveLine />
          <p>{now.toLocaleDateString("ja")}</p>
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  </div>
);

export default App;
