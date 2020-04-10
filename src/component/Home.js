import React from "react";
import RegionRoll from "./RegionRoll";
import MapPoint from "./MapPoint";
import "../App.css";

class Home extends React.Component {
  state = {
    lat: 36,
    lon: 138,
    zoom: 3,
  };

  render() {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        this.setState({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          zoom: 9,
        }),
      (err) => console.log(err)
    );

    return (
      <div>
        <div className="title-content">
          <div className="title-text">
            <h1>Tidey</h1>
            <p>とにかく「シンプル」なタイドグラフ</p>
          </div>
        </div>
        <div className="explanation-content">
          <p>
            Tideyでは全国237地点のシンプルなタイトグラフを配信しています。釣り
            <span role="img" aria-label="fishing">
              🎣
            </span>
            やサーフィン
            <span role="img" aria-label="surfing">
              🏄
            </span>
            のお供にぜひどうぞ。
          </p>
        </div>
        <div className="region-content">
          <h3>地域を探す</h3>
          <RegionRoll />
        </div>
        <div className="map-content">
          <h3>地図から探す</h3>
          <MapPoint
            data={[this.state.lat, this.state.lon]}
            zoom={this.state.zoom}
          />
        </div>
      </div>
    );
  }
}

export default Home;
