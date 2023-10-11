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
  Title,
  Subtitle,
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

  const { data } = useGetRaidByIdQuery({ id: raid_id, stat: view });
  const theme = useTheme();

  console.log("🚀 ~ file: RaidsChart.jsx:22 ~ data:", data);
  if (raid_id < 0 || !data || data.length < 1 || !profs)
    return <CircularProgress color="secondary" />;

  let raidBars = FormatData(data, orderBy);

  raidBars = OrderBars(raidBars, view, order, isDashboard);

  const customizeSeries = (seriesName) => {
    return { color: getColor(seriesName), barPadding: 0.1, barWidth: 100 };
  };

  if (max > raidBars.length) max = raidBars.length;
  raidBars = raidBars.slice(0, max - 1);
  console.log("raidBars", raidBars);
  return (
    <Chart
      id="chart"
      dataSource={raidBars}
      palette="Violet"
      rotated={true}
      height="75vh"
      customizeLabel={customizeLabel}
    >
      <AdaptiveLayout
        height={200}
        width={400}
      />
      <Title text={`Details graph`}>
        <Subtitle text={`${view}`} />
      </Title>
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
      <ArgumentAxis
        title="Character"
        inverted={true}
      ></ArgumentAxis>
      <ValueAxis title={view}>
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
      {raidBars.map((data) => [
        <Annotation
          argument={data.name}
          text={`${data.timesTop}/${data.timesPresent}`}
        ></Annotation>,
      ])}
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="right"
      />
    </Chart>
  );
};

const customizeLabel = (arg) => {
  console.log("label argument:", arg);
  return {
    visible: true,
    alignment: "left",
    backgroundColor: "#transparent",
    position: "inside",
    font: {
      color: "black",
    },
    customizeText(e) {
      return `${arg.data.total.toLocaleString()} (${arg.data.avg.toLocaleString()})`;
    },
  };
};

const FormatData = (data, orderBy) => {
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
    raidBars.push({
      name: `${playerName} (${profShort})`,
      y: orderBy === "Total" ? total : avg,
      yColor: "#675123",
      prof: prof,
      avg: avg,
      total: total,
      timesTop: times_top,
      timesPresent: times_present,
    });
    return raidBars;
  });
  return raidBars;
};

const OrderBars = (chart, view, order, isDashboard) => {
  const DescStatList = ["dist", "deaths", "dmg_taken"];

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
