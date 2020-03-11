import React from "react";
import moment from "moment";
import MyResponsiveLine from "./MyResponsiveLine.js";
import "../App.css";

function formatData(fetchData, days) {
  let data = {
    name: fetchData.name,
    graph: [
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
  let tideData = [];
  for (let i = 0; i < days; i++) {
    let date = moment({ hour: 0 }).add(i, "days");
    let strDate = date.format("YYYY/MM/DD");
    let dailyData = fetchData.data[strDate];
    let graphDate = date.subtract(1, "hours");
    let graphData = dailyData.tide.map(hourlyData => ({
      x: graphDate.add(1, "hours").format("YYYY/MM/DD HH:mm"),
      y: hourlyData
    }));
    tideData.push(...dailyData.tide);
    data.graph[0].data.push(...graphData);
    data.sunrise.push(strDate + " " + dailyData.sunrise);
    data.sunset.push(strDate + " " + dailyData.sunset);
  }
  data.maxtide = Math.max(...tideData);
  data.mintide = Math.min(...tideData);
  return data;
}

class TideGrapph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      formatDays: 3
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
        <div style={{ height: "100vh" }}>
          <br />
          <br />
          <h1>Error</h1>
          <p>Error: {error.message}</p>
          <br />
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div style={{ height: "100vh" }}>
          <br />
          <br />
          <h1>Looding...</h1>
          <br />
        </div>
      );
    } else {
      const data = formatData(items, formatDays);
      return (
        <div>
          <h1 className="App-title">
            {data.name}
            <span style={{ fontSize: "0.7em" }}>のタイトグラフ</span>
          </h1>
          <MyResponsiveLine data={data} />
        </div>
      );
    }
  }
}

export default TideGrapph;
