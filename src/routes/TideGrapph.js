import React, { useState, useEffect } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import MyResponsiveLine from "../component/MyResponsiveLine.js";
import Table from "../component/Table.js";
import MapPoint from "../component/MapPoint.js";
import Loading from "../component/Loading.js";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: "1em",
    border: "solid 1px",
    borderRadius: "5px",
    marginTop: "1em",
    paddingLeft: "0.3em",
  },
}));

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

const fetchTideData = (year, month, point) =>
  fetch(`${process.env.PUBLIC_URL}/data/${year}/${month}/${point}.json`);

export default function TideGrapph(props) {
  const classes = useStyles();
  const fetchDays = 5;
  const pointData = props.data;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsLoaded(false);
  };

  useEffect(() => {
    const year = selectedDate.year();
    const month = selectedDate.month() + 1;
    Promise.all([
      fetchTideData(year, month, pointData.point),
      fetchTideData(year, month + 1, pointData.point),
    ])
      .then((res) => Promise.all([res[0].json(), res[1].json()]))
      .then(
        (result) => {
          const data2month = { ...result[0].data, ...result[1].data };
          const items = formatData(
            data2month,
            pointData,
            selectedDate,
            fetchDays
          );
          setItems(items);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, [pointData, selectedDate]);

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
        <Loading />
      </div>
    );
  } else {
    const { graphData, tableData, mapData } = items;
    return (
      <div className="App-contents">
        <h1 style={{ clear: "right" }}>
          {graphData.name}
          <span style={{ fontSize: "0.7em" }}>のタイドグラフ</span>
          <span
            style={{
              float: "right",
              fontSize: "0.4em",
            }}
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                format="MM/DD [-]"
                minDate={moment("20200101", "YYYYMMDD")}
                maxDate={moment("20201130", "YYYYMMDD")}
                value={selectedDate}
                onChange={handleDateChange}
                inputProps={{ size: "7" }}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input,
                }}
              />
            </MuiPickersUtilsProvider>
          </span>
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
