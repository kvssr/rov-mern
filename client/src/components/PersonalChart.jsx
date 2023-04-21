import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, CircularProgress } from "@mui/material";

const PersonalChart = (data2) => {
  const theme = useTheme();

  console.log("data2", data2.data);

  // let lines = []
  // data2.data.forEach((row)=>{
  //   let line = {
  //     id: row.date
  //   }
  //   for (let stat in row){

  //   }
  // });

  const data = [
    {
      id: "japan",
      color: "hsl(245, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 171,
        },
        {
          x: "helicopter",
          y: 85,
        },
        {
          x: "boat",
          y: 188,
        },
        {
          x: "train",
          y: 168,
        },
        {
          x: "subway",
          y: 169,
        },
        {
          x: "bus",
          y: 60,
        },
        {
          x: "car",
          y: 2,
        },
        {
          x: "moto",
          y: 80,
        },
        {
          x: "bicycle",
          y: 181,
        },
        {
          x: "horse",
          y: 248,
        },
        {
          x: "skateboard",
          y: 21,
        },
        {
          x: "others",
          y: 248,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(341, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 166,
        },
        {
          x: "helicopter",
          y: 194,
        },
        {
          x: "boat",
          y: 13,
        },
        {
          x: "train",
          y: 155,
        },
        {
          x: "subway",
          y: 293,
        },
        {
          x: "bus",
          y: 163,
        },
        {
          x: "car",
          y: 31,
        },
        {
          x: "moto",
          y: 138,
        },
        {
          x: "bicycle",
          y: 130,
        },
        {
          x: "horse",
          y: 207,
        },
        {
          x: "skateboard",
          y: 29,
        },
        {
          x: "others",
          y: 239,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(126, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 215,
        },
        {
          x: "helicopter",
          y: 75,
        },
        {
          x: "boat",
          y: 229,
        },
        {
          x: "train",
          y: 251,
        },
        {
          x: "subway",
          y: 126,
        },
        {
          x: "bus",
          y: 155,
        },
        {
          x: "car",
          y: 270,
        },
        {
          x: "moto",
          y: 269,
        },
        {
          x: "bicycle",
          y: 176,
        },
        {
          x: "horse",
          y: 210,
        },
        {
          x: "skateboard",
          y: 103,
        },
        {
          x: "others",
          y: 97,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(280, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 100,
        },
        {
          x: "helicopter",
          y: 291,
        },
        {
          x: "boat",
          y: 117,
        },
        {
          x: "train",
          y: 240,
        },
        {
          x: "subway",
          y: 290,
        },
        {
          x: "bus",
          y: 202,
        },
        {
          x: "car",
          y: 195,
        },
        {
          x: "moto",
          y: 12,
        },
        {
          x: "bicycle",
          y: 8,
        },
        {
          x: "horse",
          y: 55,
        },
        {
          x: "skateboard",
          y: 117,
        },
        {
          x: "others",
          y: 64,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(95, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 71,
        },
        {
          x: "helicopter",
          y: 297,
        },
        {
          x: "boat",
          y: 12,
        },
        {
          x: "train",
          y: 223,
        },
        {
          x: "subway",
          y: 242,
        },
        {
          x: "bus",
          y: 31,
        },
        {
          x: "car",
          y: 211,
        },
        {
          x: "moto",
          y: 85,
        },
        {
          x: "bicycle",
          y: 66,
        },
        {
          x: "horse",
          y: 29,
        },
        {
          x: "skateboard",
          y: 171,
        },
        {
          x: "others",
          y: 128,
        },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[300],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabelYOffset={-12}
      areaBlendMode="hard-light"
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    ></ResponsiveLine>
  );
};

export default PersonalChart;
