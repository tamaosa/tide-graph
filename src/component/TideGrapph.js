import React from "react";
import moment from "moment";
import MyResponsiveLine from "./MyResponsiveLine.js";
import Table from "./Table.js";
import "../App.css";
import MapPoint from "./MapPoint.js";

function formatData(fetchData, days) {
  let graphData = {
    name: fetchData.name,
    tide: [
      {
        id: fetchData.point,
        data: []
      }
    ],
    sunrise: [],
    sunset: [],
    maxtide: null,
    mintide: null
  };
  let tableData = [];
  let mapData = [fetchData.lat, fetchData.lon];

  let tideData = [];
  for (let i = 0; i < days; i++) {
    let date = moment({ hour: 0 }).add(i, "days");
    let strDate = date.format("YYYY/MM/DD");
    let dailyData = fetchData.data[strDate];

    tableData.push(dailyData);
    let graphDate = date.subtract(1, "hours");
    let coordinate = dailyData.tide.map(hourlyData => ({
      x: graphDate.add(1, "hours").format("YYYY/MM/DD HH:mm"),
      y: hourlyData
    }));
    tideData.push(...dailyData.tide);
    graphData.tide[0].data.push(...coordinate);
    graphData.sunrise.push(strDate + " " + dailyData.sunrise);
    graphData.sunset.push(strDate + " " + dailyData.sunset);
  }
  graphData.maxtide = Math.max(...tideData);
  graphData.mintide = Math.min(...tideData);
  return { graphData, tableData, mapData };
}

class TideGrapph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      formatDays: 5
    };
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data/${this.props.point}.json`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items, formatDays } = this.state;
    if (error) {
      return (
        <div className="simple-content">
          <h1>Error</h1>
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="simple-content">
          <div className="loader">Loading...</div>
        </div>
      );
    } else {
      const { graphData, tableData, mapData } = formatData(items, formatDays);
      return (
        <div className="App-contents">
          <h1>
            {graphData.name}
            <span style={{ fontSize: "0.7em" }}>のタイドグラフ</span>
          </h1>
          <MyResponsiveLine data={graphData} />
          <Table data={tableData} />
          <div className="map-content">
            <p>周辺地域</p>
            <MapPoint data={mapData} zoom={10} />
          </div>
        </div>
      );
    }
  }
}

export default TideGrapph;
