import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MyResponsiveLine from "./component/MyResponsiveLine.js";

function App() {
  let now = new Date();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{ height: "720px", width: "1000px" }}>
          <MyResponsiveLine />
        </div>
        <h2>{now.toLocaleDateString("ja")}</h2>
      </header>
    </div>
  );
}

export default App;
