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
      </header>
      <main className="App-main">
        <div className="container">
          <h1>金沢のタイトグラフ</h1>
          <MyResponsiveLine />
          <p>{now.toLocaleDateString("ja")}</p>
        </div>
      </main>
      <footer className="App-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
