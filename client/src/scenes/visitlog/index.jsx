import React from "react";
import Header from "components/Header";
import VisitlogChart from "./VisitlogChart";
import { ButtonGroup } from "devextreme-react";
import { Box } from "@mui/material";
import { useState } from "react";
import LogUserChart from "./LogUserChart";

const buttonItems = [
  {
    id: "all-btn",
    text: "All",
    startTime: new Date().setFullYear(new Date().getFullYear() - 10),
  },
  {
    id: "year-btn",
    text: "1 Year",
    startTime: new Date().setFullYear(new Date().getFullYear() - 1),
  },
  {
    id: "month-btn",
    text: "1 Month",
    startTime: new Date().setMonth(new Date().getMonth() - 1),
  },
  {
    id: "week-btn",
    text: "1 Week",
    startTime: new Date().setDate(new Date().getDate() - 7),
  },
  {
    id: "day-btn",
    text: "1 Day",
    startTime: new Date().setDate(new Date().getDate() - 1),
  },
];

const Visitlog = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 10)
  );

  console.log("selected date: ", selectedDate);
  const handleSelectionChange = (e) => {
    setSelectedDate(e.itemData.startTime);
  };

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
        <VisitlogChart startDate={selectedDate} />
        <Box
          mt="1rem"
          mb="1rem"
        >
          <ButtonGroup
            items={buttonItems}
            keyExpr="id"
            selectionMode="single"
            onItemClick={handleSelectionChange}
          ></ButtonGroup>
        </Box>
        <LogUserChart startDate={selectedDate} />
      </Box>
    </Box>
  );
};

export default Visitlog;
