import React from "react";
import { ResponsiveLine } from "@nivo/line";
import "../App.css";

const tidedata = [
  {
    id: "AA",
    data: [
      {
        x: "2019/05/29 00:00",
        y: 17
      },
      {
        x: "2019/05/29 01:00",
        y: 12
      },
      {
        x: "2019/05/29 02:00",
        y: 5
      },
      {
        x: "2019/05/29 03:00",
        y: 16
      },
      {
        x: "2019/05/29 04:00",
        y: 17
      },
      {
        x: "2019/05/29 05:00",
        y: 12
      },
      {
        x: "2019/05/29 06:00",
        y: 5
      }
    ]
  }
];
const textColor = "#F4F9FF";
const baseColor = "#282c34";
const mainColor = "#0094FA";
const accentColor = "#D3FBD8";

const MyResponsiveLine = () => (
  <div
    style={{ overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap" }}
  >
    <div style={{ height: "720px", width: "2000px" }}>
      <ResponsiveLine
        data={tidedata}
        margin={{ top: 50, right: 50, bottom: 100, left: 100 }}
        theme={{
          background: baseColor,
          fontSize: 20,
          textColor: textColor,
          axis: {
            legend: {
              text: {
                fontSize: 30
              }
            }
          }
        }}
        xScale={{
          type: "time",
          format: "%Y/%m/%d %H:%M",
          useUTC: false
        }}
        xFormat="time:%H:%M"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto"
        }}
        curve="basis"
        lineWidth={10}
        enableArea={true}
        areaBaselineValue={5}
        areaOpacity={0.05}
        axisBottom={{
          orient: "bottom",
          format: "%H:%M",
          tickSize: 10,
          tickPadding: 10,
          legend: "時間 [h]",
          legendOffset: 70,
          legendPosition: "start"
        }}
        axisTop={{
          format: "%m/%d",
          tickValues: "every day",
          tickSize: 10,
          tickPadding: 10
        }}
        axisLeft={{
          orient: "left",
          legend: "潮位 [cm]",
          tickSize: 10,
          tickPadding: 10,
          legendOffset: -70,
          legendPosition: "middle"
        }}
        colors={mainColor}
        enablePoints={false}
        isInteractive={false}
        markers={[
          {
            axis: "x",
            value: new Date("2019/05/29 05:20"),
            legend: "日の出",
            legendPosition: "top",
            legendOffsetY: 20,
            lineStyle: {
              stroke: accentColor,
              strokeWidth: 2
            },
            textStyle: {
              fill: accentColor,
              fontSize: 20
            }
          }
        ]}
      />
    </div>
  </div>
);

export default MyResponsiveLine;
