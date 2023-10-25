import { useTheme } from "@mui/material";
import { useGetPersRaidStatsQuery } from "state/api";
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
} from "devextreme-react/chart";

const PersonalExtreme = ({ data, selectedRows, selectedStat }) => {
  const theme = useTheme();

  const raidIds = data.raids
    .map((raid) => {
      if (selectedRows.includes(raid.id)) return raid.id;
      return undefined;
    })
    .filter((r) => r !== undefined);

  const { data: persRaidStats, isFetching } = useGetPersRaidStatsQuery({
    raids: raidIds,
    prof: data.profession.id,
    stat: selectedStat ? selectedStat.id : 1,
  });

  if (!persRaidStats || isFetching) return "Loading...";

  console.log("persRaidStats", persRaidStats);
  console.log("data", data);
  console.log("selected", selectedStat);

  const customizeSeries = (seriesName) => {
    console.log("seriesName", seriesName);
    const colorsList = {
      MinMaxArea: "#737373",
      MinProf: "#808080",
      MaxProf: "#666666",
      MaxAll: "#FFF0DB",
    };
    return seriesName === "MinMaxArea"
      ? {
          type: "rangearea",
          rangeValue1Field: "valueMin",
          rangeValue2Field: "valueMax",
          color: colorsList[seriesName] || "grey",
        }
      : { color: colorsList[seriesName] || data.profession.color };
  };

  let persLine = [];
  data.raids.forEach((row) => {
    if (raidIds.includes(row.id)) {
      persLine.push({
        raidDate: `${row.date}T${row.start_time}.000Z`,
        value: selectedStat ? row[selectedStat.short] : row["dmg"],
        name: data.character,
      });
    }
  });

  let lines = [...persRaidStats.data, ...persLine];
  console.log("lines", lines);

  const legendClickHandler = (e) => {
    const series = e.target;
    if (series.isVisible()) {
      series.hide();
    } else {
      series.show();
    }
  };
  return (
    <Chart
      id="chart"
      dataSource={lines}
      palette="Violet"
      onLegendClick={legendClickHandler}
    >
      <Title text={`History graph of ${data.character}`}>
        <Subtitle text={`${selectedStat ? selectedStat.label : "Damage"}`} />
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
        argumentField="raidDate"
        valueField="value"
        type="line"
        minBarSize={2}
      />
      <SeriesTemplate
        nameField="name"
        customizeSeries={customizeSeries}
      />
      <ArgumentAxis
        argumentType="datetime"
        title="Date"
      >
        <Label format="dd-MMM"></Label>
      </ArgumentAxis>
      <ValueAxis
        title={selectedStat ? selectedStat.label : "Damage"}
      ></ValueAxis>
      <Legend
        verticalAlignment="bottom"
        horizontalAlignment="center"
      />
    </Chart>
  );
};

export default PersonalExtreme;
