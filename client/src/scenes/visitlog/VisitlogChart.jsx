import React from "react";
import { useTheme } from "@mui/material";
import {
  ArgumentAxis,
  Chart,
  Legend,
  Series,
  Tooltip,
  ValueAxis,
  ZoomAndPan,
} from "devextreme-react/chart";
import { useGetVisitLogCountDayQuery } from "state/api";

const VisitlogChart = ({ startDate }) => {
  const theme = useTheme();
  console.log("StartDate", startDate);
  const { data } = useGetVisitLogCountDayQuery(startDate);
  if (!data) return "Loading...";
  console.log("🚀 ~ file: index.jsx:16 ~ Visitlog ~ data:", data);
  return (
    <Chart
      id="chart"
      dataSource={data}
    >
      <ArgumentAxis
        argumentType="datetime"
        type="continuous"
        title="Date"
      >
        {" "}
      </ArgumentAxis>
      <ZoomAndPan
        valueAxis="none"
        argumentAxis="both"
        dragToZoom={true}
        panKey="shift"
      />
      <ValueAxis
        valueType="numeric"
        tickInterval={1}
        title="Views"
      ></ValueAxis>
      <Legend visible={false} />
      <Tooltip
        enabled={true}
        location="edge"
        contentRender={customizeTooltip}
      />
      <Series
        valueField="_count"
        argumentField="created_at"
        name="Views"
        type="bar"
        color={theme.palette.secondary[200]}
      />
    </Chart>
  );
};

const customizeTooltip = (pointData) => {
  return (
    <div style={{}}>
      <p
        style={{
          padding: "0rem 1rem",
          margin: "0rem",
        }}
      >
        <b>Date</b>: {new Date(pointData.argumentText).toDateString()}
        <br />
        <b>Total</b>: {pointData.valueText}
        <br />
      </p>
    </div>
  );
};

export default VisitlogChart;
