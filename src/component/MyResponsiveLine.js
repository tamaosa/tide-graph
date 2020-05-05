import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@material-ui/core/styles";

const MyResponsiveLine = (props) => {
  const theme = useTheme();
  const { tide, sunrise, sunset, maxtide, mintide } = props.data;

  const sunriseMarker = sunrise.map((x) => ({
    axis: "x",
    value: new Date(x),
    legend: "日の出",
    legendPosition: "top",
    legendOffsetY: 15,
    lineStyle: {
      stroke: theme.palette.info.main,
      strokeWidth: 2,
    },
    textStyle: {
      fill: theme.palette.info.main,
      fontSize: 12,
    },
  }));

  const sunsetMarker = sunset.map((x) => ({
    axis: "x",
    value: new Date(x),
    legend: "日の入り",
    legendPosition: "top",
    legendOffsetY: 15,
    lineStyle: {
      stroke: theme.palette.info.main,
      strokeWidth: 2,
    },
    textStyle: {
      fill: theme.palette.info.main,
      fontSize: 12,
    },
  }));

  return (
    <div
      style={{ overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap" }}
    >
      <div style={{ height: "75vh", width: "2800px" }}>
        <ResponsiveLine
          data={tide}
          margin={{ top: 50, right: 10, bottom: 80, left: 70 }}
          theme={{
            fontFamily: ['"M PLUS 1p"', "-apple-system", "sans-serif"].join(
              ","
            ),
            background: theme.palette.background.default,
            fontSize: 12,
            textColor: theme.palette.text.primary,
            axis: {
              legend: {
                text: {
                  fontSize: 18,
                },
              },
            },
          }}
          xScale={{
            type: "time",
            format: "%Y/%m/%d %H:%M",
            useUTC: false,
          }}
          xFormat="time:%H:%M"
          yScale={{
            type: "linear",
            min: mintide,
            max: maxtide,
          }}
          curve="basis"
          lineWidth={5}
          enableArea={false}
          areaBaselineValue={mintide}
          areaOpacity={0.05}
          axisBottom={{
            orient: "bottom",
            format: "%H",
            tickValues: "every 1 hours",
            tickSize: 10,
            tickPadding: 10,
            legend: "時間 [h]",
            legendOffset: 50,
            legendPosition: "start",
          }}
          axisTop={{
            format: "%m/%d",
            tickValues: "every day",
            tickSize: 10,
            tickPadding: 20,
          }}
          axisLeft={{
            orient: "left",
            legend: "潮位 [cm]",
            tickSize: 10,
            tickPadding: 10,
            legendOffset: -60,
            legendPosition: "middle",
          }}
          colors={theme.palette.primary.main}
          enablePoints={false}
          isInteractive={false}
          markers={sunriseMarker.concat(sunsetMarker)}
        />
      </div>
    </div>
  );
};

export default MyResponsiveLine;
