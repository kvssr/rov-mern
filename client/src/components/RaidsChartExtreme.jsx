import React from "react";
import { useTheme, CircularProgress } from "@mui/material";
import { useGetProfessionsQuery, useGetRaidByIdQuery } from "state/api";
import Chart, {
  CommonSeriesSettings,
  Legend,
  Tooltip,
  SeriesTemplate,
  LoadingIndicator,
  ArgumentAxis,
  Label,
  ValueAxis,
  Crosshair,
  AdaptiveLayout,
  CommonAnnotationSettings,
  Annotation,
} from "devextreme-react/chart";

const RaidsChart = ({
  isDashboard = false,
  raid_id,
  view,
  max = 15,
  order = "Desc",
  orderBy = "Total",
}) => {
  const { data: profs } = useGetProfessionsQuery();

  const getColor = (profName) => {
    return profs.filter((prof) => prof.name === profName)[0].color;
  };

  const { data, isLoading } = useGetRaidByIdQuery({ id: raid_id, stat: view });
  const theme = useTheme();

  if (isLoading || raid_id < 0 || !data || data.length < 1 || !profs)
    return <CircularProgress color="secondary" />;
  // console.log("🚀 ~ file: RaidsChart.jsx:22 ~ data:", data);
  // console.log(`Loading chart Extreme, ${view}, ${max}, ${order}, ${isLoading}`);

  let raidBars = FormatData(data, orderBy, view, isDashboard);

  raidBars = OrderBars(raidBars, view, order, isDashboard);

  const customizeSeries = (seriesName) => {
    return { color: getColor(seriesName), barWidth: 100 };
  };

  if (max > raidBars.length) max = raidBars.length;
  raidBars = raidBars.slice(0, max);
  let topValue = order === "Asc" ? raidBars[max - 1].y : raidBars[0].y;
  // console.log("raidBars", raidBars);

  const customizeLabel = (arg) => {
    let pos = arg.data.y < topValue / 5 ? "outside" : "inside";
    pos = isDashboard ? "outside" : pos;
    const colour = pos === "outside" ? "#EEE" : "Black";
    return {
      visible: true,
      alignment: "left",
      backgroundColor: "#transparent",
      position: pos,
      font: {
        color: colour,
      },
      customizeText(e) {
        return `${arg.data.total.toLocaleString()} (${arg.data.avg.toLocaleString()})`;
      },
    };
  };

  return (
    <Chart
      id="chart"
      dataSource={raidBars}
      palette="Violet"
      rotated={true}
      height="100%"
      customizeLabel={customizeLabel}
    >
      <AdaptiveLayout
        height={200}
        width={300}
      />
      <Crosshair
        enabled={true}
        color={theme.palette.secondary[400]}
        opacity={0.8}
        dashStyle="longDash"
      >
        <Label visible={true} />
      </Crosshair>
      <LoadingIndicator enabled={true} />
      <Tooltip enabled={true}></Tooltip>
      <CommonSeriesSettings
        argumentField="name"
        valueField="y"
        type="bar"
        ignoreEmptyPoints={true}
      />
      <SeriesTemplate
        nameField="prof"
        customizeSeries={customizeSeries}
      />
      <ArgumentAxis inverted={true}></ArgumentAxis>
      <ValueAxis>
        <Label
          visible={true}
          alignment="center"
          //   customizeText={customizeText}
        ></Label>
      </ValueAxis>
      <CommonAnnotationSettings
        type="text"
        allowDragging={false}
        color="transparent"
        font={{
          color: "black",
        }}
        offsetX={20}
        offsetY={0}
        border={false}
      ></CommonAnnotationSettings>
      {raidBars.map((data) => {
        if (data.y > (topValue / 15) * (1.5 * isDashboard)) {
          return (
            <Annotation
              argument={data.name}
              text={`${data.timesTop}/${data.timesPresent}`}
            ></Annotation>
          );
        }
        return null;
      })}
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="right"
      />
    </Chart>
  );
};

const FormatData = (data, orderBy, view, isDashboard) => {
  let raidBars = [];
  console.log("Formatting", data);
  if (!data || data[0]["characterRaidStats"].length < 1) {
    return raidBars;
  }
  data.map((row) => {
    const playerName = row["name"];
    const total = row["characterRaidStats"][0]["value"];
    const prof = row["profession"]["name"];
    const profShort = row["profession"]["name_short"];
    const avg = row["characterRaidStats"][1]["value"];
    const times_top = row["characterRaidStats"][0]["times_top"];
    const times_present = row["characterRaidInfo"][0]["num_fights_present"];
    const atten_pers = row["characterRaidInfo"][0]["attendance_percentage"];
    let yValue = orderBy === "Total" ? total : avg;
    yValue = view === "dist" && isDashboard ? avg : yValue;
    if (view === "dist" && isDashboard && atten_pers < 80) {
    } else {
      raidBars.push({
        name: `${playerName} (${profShort})`,
        y: yValue,
        yColor: "#675123",
        prof: prof,
        avg: avg,
        total: total,
        timesTop: times_top,
        timesPresent: times_present,
        attenPers: atten_pers,
      });
    }
    return raidBars;
  });
  return raidBars;
};

const OrderBars = (chart, view, order, isDashboard) => {
  const DescStatList = ["dist", "deaths", "dmg_taken_total"];

  if ((DescStatList.includes(view) && isDashboard) || order === "Asc") {
    chart.sort((a, b) => {
      return a.y - b.y;
    });
  } else {
    chart.sort((a, b) => {
      return b.y - a.y;
    });
  }
  return chart;
};

export default RaidsChart;
