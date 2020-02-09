import React from "react";
import "./App.css";
import MyResponsiveLine from "./component/MyResponsiveLine.js";
import Navbar from "./component/Navbar.js";
import Footer from "./component/Footer.js";

function App() {
  let now = new Date();
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
