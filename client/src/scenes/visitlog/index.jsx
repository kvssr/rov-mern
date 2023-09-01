import { Box, useTheme } from "@mui/material";
import React from "react";
import {
  ArgumentAxis,
  Chart,
  Legend,
  Series,
  Tooltip,
  ValueAxis,
} from "devextreme-react/chart";
import { useGetVisitLogCountDayQuery } from "state/api";
import Header from "components/Header";

const Visitlog = () => {
  const { data } = useGetVisitLogCountDayQuery();
  const theme = useTheme();

  return (
    <Box
      display="grid"
      m="1.5rem 2.5rem"
      gridTemplateColumns="repeat(12, 1fr)"
      sx={{
        "& > div": { gridColumn: "span 12" },
      }}
    >
      <Header
        title="Views"
        subtitle="Overview of user visits"
      />
      <Box
        mt="1rem"
        mr="2rem"
      >
        <Chart
          id="chart"
          dataSource={data}
        >
          <ArgumentAxis
            argumentType="datetime"
            type="continuous"
            title="Date"
          ></ArgumentAxis>

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
      </Box>
    </Box>
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

export default Visitlog;
