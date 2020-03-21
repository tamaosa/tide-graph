import React from "react";
import MapPoint from "./MapPoint";
import "../App.css";

const Home = () => (
  <div>
    <div className="title-content">
      <div className="title-text">
        <h1>Tidey</h1>
        <p>とにかく「シンプル」なタイドグラフ</p>
      </div>
    </div>
    <div className="explanation-content">
      <p>
        Tideyでは全国239地点のシンプルなタイトグラフを配信しています。釣り
        <span role="img" aria-label="fishing">
          🎣🎣
        </span>
        やサーフィン
        <span role="img" aria-label="surfing">
          🏄🏄
        </span>
        のお供にぜひどうぞ。
      </p>
    </div>
    <div className="map-content">
      <h3>地域を探す</h3>
      <MapPoint data={[36, 138]} zoom={3} />
    </div>
  </div>
);

export default Home;
