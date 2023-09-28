import React from "react";
import { useTheme } from "@mui/material";
import {
  ArgumentAxis,
  Chart,
  Legend,
  Series,
  Tooltip,
  ValueAxis,
} from "devextreme-react/chart";
import { useGetVisitLogUserCountQuery } from "state/api";

const LogUserChart = ({ startDate }) => {
  console.log("Log User Chart startDate", startDate);
  const { data } = useGetVisitLogUserCountQuery(startDate);
  const theme = useTheme();

  if (!data) return "Loading...";
  const bars = data.map((row) => {
    return {
      account: row.account.name,
      count: row._count,
    };
  });
  console.log("bars:", bars);
  return (
    <Chart
      id="chart"
      dataSource={bars}
      rotated={true}
    >
      <ArgumentAxis
        title="Account"
        inverted={true}
      >
        {" "}
      </ArgumentAxis>
      <ValueAxis
        valueType="numeric"
        title="Views"
      ></ValueAxis>
      <Legend visible={false} />
      <Tooltip
        enabled={true}
        location="edge"
        contentRender={customizeTooltip}
      />
      <Series
        valueField="count"
        argumentField="account"
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
        <b>Account</b>: {pointData.argumentText}
        <br />
        <b>Total</b>: {pointData.valueText}
        <br />
      </p>
    </div>
  );
};

export default LogUserChart;
