import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme, CircularProgress } from "@mui/material";
import { useGetProfessionsQuery, useGetRaidByIdQuery } from "state/api";

const RaidsChart = ({
  isDashboard = false,
  raid_id,
  view,
  players,
  max = 15,
}) => {
  const { data: profs } = useGetProfessionsQuery();
  console.log("🚀 ~ file: RaidsChart.jsx:43 ~ profs:", profs);
  const getColor = (bar) => {
    return profs.filter((prof) => prof.name === bar.data.prof)[0].color;
  };
  const { data } = useGetRaidByIdQuery({ id: raid_id, stat: view });
  const theme = useTheme();

  if (!data) return <CircularProgress color="secondary" />;

  const raidBars = [];
  const DescStatList = ["dist", "deaths", "dmg_taken"];

  data.map((row) => {
    const playerName = row["name"];
    const total = row["characterRaidStats"][0]["value"];
    const prof = row["profession"]["name"];
    const profShort = row["profession"]["name_short"];
    const avg = row["characterRaidStats"][1]["value"];
    raidBars.push({
      name: `${playerName} (${profShort})`,
      y: total,
      yColor: "#675123",
      prof: prof,
      avg: avg,
    });
    return raidBars;
  });

  if (DescStatList.includes(view)) {
    raidBars.sort((a, b) => {
      return a.y - b.y;
    });
  } else {
    raidBars.sort((a, b) => {
      return b.y - a.y;
    });
  }

  if (max > raidBars.length) max = raidBars.length;
  console.log("raidBars", raidBars);
  return (
    <ResponsiveBar
      data={raidBars.slice(0, max - 1).reverse()}
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
      keys={["y"]}
      tooltip={(data) => {
        return (
          <div style={{}}>
            <h4
              style={{
                backgroundColor: data.color,
                padding: "0rem 1rem",
                margin: "0rem",
              }}
            >
              {data.indexValue}
            </h4>
            <p
              style={{
                backgroundColor: theme.palette.primary[600],
                padding: "0rem 1rem",
                margin: "0rem",
              }}
            >
              <b>Prof</b>: {data.data.prof}
              <br />
              <b>Total</b>:{" "}
              {data.value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
              <br />
              <b>Average</b>:{" "}
              {data.data.avg.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        );
      }}
      indexBy="name"
      margin={{ top: 50, right: 50, bottom: 50, left: 130 }}
      padding={0.3}
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getColor}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 20,
        legend: "total",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={70}
      labelSkipHeight={10}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.8]],
      }}
      label={(bar) =>
        `${bar.value.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })} (${
          bar.data.avg
            ? bar.data.avg.toLocaleString(undefined, {
                minimumFractionDigits: 0,
              })
            : ""
        })`
      }
      enableGridY={false}
      enableGridX={true}
      role="application"
    />
  );
};

export default RaidsChart;
