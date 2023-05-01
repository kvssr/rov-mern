import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, CircularProgress } from "@mui/material";
import { useGetPersRaidStatsQuery } from "state/api";
import { linearGradientDef, Defs } from "@nivo/core";
import { area, curveMonotoneX } from "d3-shape";

const PersonalChart = ({ data, selectedRows, selectedStat }) => {
  const theme = useTheme();

  const profession = data.profession.id;

  const profHigh = [];
  const profLow = [];
  const raidIds = data.raids
    .map((raid) => {
      if (selectedRows.includes(raid.id)) return raid.id;
    })
    .filter((r) => r !== undefined);

  const { data: persRaidStats, isLoading } = useGetPersRaidStatsQuery({
    raids: raidIds,
    prof: data.profession.id,
    stat: selectedStat ? selectedStat.id : 1,
  });

  if (!persRaidStats || isLoading) return "Loading...";

  let lines = [
    // persRaidStats.maxAll,
    persRaidStats.maxProf,
    persRaidStats.minProf,
  ];

  let line = {
    id: data.character,
    color: data.profession.color,
    data: [],
  };
  data.raids.forEach((row) => {
    if (raidIds.includes(row.id)) {
      let newRow = {
        x: row.date,
        y: selectedStat ? row[selectedStat.short] : row.dmg,
      };
      if (lines[0].data.filter((r) => r.x === row.date).length > 0) {
        newRow.yMax = lines[0].data.filter((r) => r.x === row.date)[0].y;
        newRow.yMin = lines[1].data.filter((r) => r.x === row.date)[0].y;
      }
      if (newRow.y) line.data.push(newRow);
    }
  });
  lines.unshift(line);
  console.log(
    "🚀 ~ file: PersonalChart.jsx:54 ~ PersonalChart ~ lines:",
    lines
  );

  const styleById = {};
  styleById["Highest prof"] = {
    strokeDasharray: "12, 6",
    strokeWidth: 1,
  };
  styleById["Lowest prof"] = {
    strokeDasharray: "12, 6",
    strokeWidth: 1,
  };
  styleById["default"] = {
    strokeWidth: 4,
  };

  const DashedLine = ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }) => (
      <path
        key={id}
        d={lineGenerator(
          data.map((d) => ({
            x: xScale(d.data.x),
            y: yScale(d.data.y),
          }))
        )}
        fill="none"
        stroke={color}
        style={styleById[id] || styleById.default}
      />
    ));
  };

  const AreaLayer = ({ series, xScale, yScale, innerHeight }) => {
    const areaGenerator = area()
      .x((d) => xScale(d.data.x))
      .y0((d) => yScale(d.data.yMin))
      .y1((d) => yScale(d.data.yMax));

    return (
      <>
        <Defs
          defs={[
            {
              id: "pattern",
              type: "patternLines",
              background: "transparent",
              color: theme.palette.primary[200],
              lineWidth: 1,
              spacing: 7,
              rotation: -45,
            },
          ]}
        />
        <path
          d={areaGenerator(series[0].data)}
          fill="url(#pattern)"
          fillOpacity={0.5}
          strokeWidth={2}
        />
      </>
    );
  };

  return (
    <ResponsiveLine
      data={lines}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      enableGridX={true}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        values: 5,
        min: 0,
        max: "auto",
        stacked: false,
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
      layers={[
        "grid",
        "markers",
        AreaLayer,
        "areas",
        DashedLine,
        "slices",
        "axes",
        "points",
        "legends",
      ]}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: "%b %d",
        legend: "time scale",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      gridYValues={5}
      pointColor={{ theme: "background" }}
      pointSize={10}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabelYOffset={-12}
      areaBlendMode="screen"
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
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
