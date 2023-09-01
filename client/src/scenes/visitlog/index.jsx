import { Box } from "@mui/material";
import React from "react";
import Header from "components/Header";
import VisitlogChart from "./VisitlogChart";

const Visitlog = () => {
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
        <VisitlogChart />
      </Box>
    </Box>
  );
};

export default Visitlog;
