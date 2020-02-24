import React from "react";
import { ResponsiveLine } from "@nivo/line";

const textColor = "#F4F9FF";
const baseColor = "#282c34";
const mainColor = "#0094FA";
const accentColor = "#D3FBD8";

const MyResponsiveLine = props => {
  const { graph, sunrise, sunset, maxtide, mintide } = props.data;

  const sunriseMarker = sunrise.map(x => ({
    axis: "x",
    value: new Date(x),
    legend: "日の出",
    legendPosition: "top",
    legendOffsetY: 15,
    lineStyle: {
      stroke: accentColor,
      strokeWidth: 1.5
    },
    textStyle: {
      fill: accentColor,
      fontSize: 12
    }
  }));

  const sunsetMarker = sunset.map(x => ({
    axis: "x",
    value: new Date(x),
    legend: "日の入り",
    legendPosition: "top",
    legendOffsetY: 15,
    lineStyle: {
      stroke: accentColor,
      strokeWidth: 1.5
    },
    textStyle: {
      fill: accentColor,
      fontSize: 12
    }
  }));

  return (
    <div
      style={{ overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap" }}
    >
      <div style={{ height: "75vh", width: "2400px" }}>
        <ResponsiveLine
          data={graph}
          margin={{ top: 50, right: 50, bottom: 100, left: 100 }}
          theme={{
            fontFamily: ['"M PLUS 1p"', "-apple-system", "sans-serif"].join(
              ","
            ),
            background: baseColor,
            fontSize: 12,
            textColor: textColor,
            axis: {
              legend: {
                text: {
                  fontSize: 18
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
            min: mintide,
            max: maxtide
          }}
          curve="basis"
          lineWidth={5}
          enableArea={true}
          areaBaselineValue={mintide}
          areaOpacity={0.05}
          axisBottom={{
            orient: "bottom",
            format: "%H",
            tickValues: "every 1 hours",
            tickSize: 10,
            tickPadding: 10,
            legend: "時間 [h]",
            legendOffset: 55,
            legendPosition: "start"
          }}
          axisTop={{
            format: "%m/%d",
            tickValues: "every day",
            tickSize: 10,
            tickPadding: 20
          }}
          axisLeft={{
            orient: "left",
            legend: "潮位 [cm]",
            tickSize: 10,
            tickPadding: 10,
            legendOffset: -50,
            legendPosition: "middle"
          }}
          colors={mainColor}
          enablePoints={false}
          isInteractive={false}
          markers={sunriseMarker.concat(sunsetMarker)}
        />
      </div>
    </div>
  );
};

export default MyResponsiveLine;
