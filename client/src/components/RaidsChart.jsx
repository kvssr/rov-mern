import React, { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { useGetRaidsQuery } from "state/api";

const RaidsChart = ({ isDashboard = false, view, max }) => {
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

  const theme = useTheme();
  const { data, isLoading } = useGetRaidsQuery();
  console.log("data", data);

  if (!data) return [];
  console.log("data[0]", data[0]);

  const { top_total_players, players } = data[0];
  console.log("top_total_player", top_total_players);
  console.log("players", players);

  const toppers = top_total_players[view];
  console.log(`${view}`, toppers);

  const raidBars = [];

  toppers.map((topper) => {
    const playerName = players[topper]["name"];
    const total = players[topper]["total_stats"][view];
    const prof = players[topper]["profession"];
    const avg = players[topper]["average_stats"][view];
    raidBars.push({
      name: playerName,
      y: total,
      yColor: "#675123",
      prof: prof,
      avg: avg,
    });
    return raidBars;
  });

  console.log("raidBars", raidBars);

  if (!data || isLoading) return "Loading...";
  return (
    <ResponsiveBar
      data={raidBars.slice(0, max).reverse()}
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
        tickRotation: 0,
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
      label={(bar) => `${bar.value} (${bar.data.avg})`}
      enableGridY={false}
      enableGridX={true}
      role="application"
    />
  );
};

export default RaidsChart;
