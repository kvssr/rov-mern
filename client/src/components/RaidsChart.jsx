import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme, CircularProgress } from "@mui/material";
import { useGetRaidByIdQuery } from "state/api";

const RaidsChart = ({
  isDashboard = false,
  raid_id,
  view,
  players,
  max = 15,
}) => {
  const profColors = {
    Guardian: "#72C1D9",
    Dragonhunter: "#72C1D9",
    Firebrand: "#72C1D9",
    Revenant: "#D16E5A",
    Herald: "#D16E5A",
    Renegade: "#D16E5A",
    Warrior: "#FFD166",
    Berserker: "#FFD166",
    Spellbreaker: "#FFD166",
    Engineer: "#D09C59",
    Scrapper: "#D09C59",
    Holosmith: "#D09C59",
    Ranger: "#8CDC82",
    Druid: "#8CDC82",
    Soulbeast: "#8CDC82",
    Thief: "#C08F95",
    Daredevil: "#C08F95",
    Deadeye: "#C08F95",
    Elementalist: "#F68A87",
    Tempest: "#F68A87",
    Weaver: "#F68A87",
    Mesmer: "#B679D5",
    Chronomancer: "#B679D5",
    Mirage: "#B679D5",
    Necromancer: "#52A76F",
    Reaper: "#52A76F",
    Scourge: "#52A76F",
  };
  const getColor = (bar) => profColors[bar.data.prof];
  const { data } = useGetRaidByIdQuery({ id: raid_id, stat: view });
  const theme = useTheme();

  if (!data) return <CircularProgress color="secondary" />;

  // const { top_total_players, players } = data[0];

  // const toppers = top_total_players[view];

  const raidBars = [];

  data.map((row) => {
    const playerName = row["name"];
    const total = row["characterRaidStats"][0]["value"];
    const prof = row["profession"]["name"];
    const avg = row["characterRaidStats"][1]["value"];
    raidBars.push({
      name: playerName,
      y: total,
      yColor: "#675123",
      prof: prof,
      avg: avg,
    });
    return raidBars;
  });

  raidBars.sort((a, b) => {
    return b.y - a.y;
  });

  return (
    <ResponsiveBar
      data={raidBars.slice(0, max).reverse()}
      // data={raidBars}
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
      // tooltip={(data) => `Name: ${data.indexValue}`}
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
