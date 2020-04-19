import React from "react";
import moment from "moment";
import MyResponsiveLine from "../component/MyResponsiveLine.js";
import Table from "../component/Table.js";
import MapPoint from "../component/MapPoint.js";
import "../App.css";

function formatData(tideData, pointData, fetchDate, fetchDays) {
  let graphData = {
    name: pointData.name,
    tide: [
      {
        id: pointData.point,
        data: [],
      },
    ],
    sunrise: [],
    sunset: [],
    maxtide: null,
    mintide: null,
  };
  let tableData = [];
  let mapData = [pointData.lat, pointData.lon];

  let extractedTideData = [];
  for (let i = 0; i < fetchDays; i++) {
    let date = moment(fetchDate).hour(0).minutes(0).second(0).add(i, "days");
    let strDate = date.format("YYYY/MM/DD");
    let dailyData = tideData[strDate];

    tableData.push(dailyData);
    let graphDate = date.subtract(1, "hours");
    let coordinate = dailyData.tide.map((hourlyData) => ({
      x: graphDate.add(1, "hours").format("YYYY/MM/DD HH:mm"),
      y: hourlyData,
    }));
    extractedTideData.push(...dailyData.tide);
    graphData.tide[0].data.push(...coordinate);
    graphData.sunrise.push(strDate + " " + dailyData.sunrise);
    graphData.sunset.push(strDate + " " + dailyData.sunset);
  }
  graphData.maxtide = Math.max(...extractedTideData);
  graphData.mintide = Math.min(...extractedTideData);
  return { graphData, tableData, mapData };
}

class TideGrapph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      fetchDate: new Date(),
      fetchDays: 5,
    };
  }

  componentDidMount() {
    const point = this.props.data.point;
    const year = this.state.fetchDate.getFullYear();
    const month = this.state.fetchDate.getMonth() + 1;
    const fetchTideData = (year, month, point) =>
      fetch(`${process.env.PUBLIC_URL}/data/${year}/${month}/${point}.json`);
    Promise.all([
      fetchTideData(year, month, point),
      fetchTideData(year, month + 1, point),
    ])
      .then((res) => Promise.all([res[0].json(), res[1].json()]))
      .then(
        (result) => {
          const data2month = { ...result[0].data, ...result[1].data };
          this.setState({
            isLoaded: true,
            items: formatData(
              data2month,
              this.props.data,
              this.state.fetchDate,
              this.state.fetchDays
            ),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <div className="simple-content">
          <div>
            <h1>Error</h1>
            <p>Error: {error.message}</p>
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="simple-content">
          <div className="loader">Loading...</div>
        </div>
      );
    } else {
      const { graphData, tableData, mapData } = items;
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
