import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import Header from "components/Header";
import RaidsChart from "components/RaidsChart";
import FlexBetween from "components/FlexBetween";
import { palette } from "@mui/system";
import { useTheme } from "@mui/material";

const statItems = [
  {
    text: "Damage",
    value: "dmg",
  },
  {
    text: "Boonrips",
    value: "rips",
  },
  {
    text: "Cleanses",
    value: "cleanses",
  },
  {
    text: "Heals",
    value: "heal",
  },
  {
    text: "Distance to tag",
    value: "dist",
  },
  {
    text: "Stability",
    value: "stab",
  },
  {
    text: "Protection",
    value: "prot",
  },
  {
    text: "Aegis",
    value: "aegis",
  },
  {
    text: "Regeneration",
    value: "regen",
  },
  {
    text: "Might",
    value: "might",
  },
  {
    text: "Fury",
    value: "fury",
  },
];

const Raids = () => {
  const [view, setView] = useState("dmg");
  const [max, setMax] = useState(15);
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Overview"
        subtitle="Overview of Raid"
      />
      <Box height="80vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>Stat</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            {statItems.map(({ text, value }) => {
              return <MenuItem value={value}>{text}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: "1rem", ml: "1rem", width: "100px" }}>
          <Slider
            id="silder-max"
            size="medium"
            aria-label="Max"
            defaultValue={max}
            valueLabelDisplay="auto"
            step={1}
            marks={[
              { value: 5, label: 5 },
              { value: 50, label: 50 },
            ]}
            min={5}
            max={50}
            onChangeCommitted={(_, value) => setMax(value)}
          />
        </FormControl>
        <RaidsChart
          view={view}
          max={max}
        />
      </Box>
    </Box>
  );
};

export default Raids;
