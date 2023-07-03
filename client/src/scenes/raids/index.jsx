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
import { useGetRaidsInfoListQuery } from "state/api";
import RaidSelector from "components/RaidSelector";

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
  const [selectedRaid, setSelectedRaid] = useState(-1);
  const [view, setView] = useState("dmg");
  const [max, setMax] = useState(15);
  const { data: raidInfoList, isLoading } = useGetRaidsInfoListQuery();

  if (!raidInfoList || isLoading) {
    return "Is Loading...";
  }

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
        title="Overview"
        subtitle="Overview of Raid"
      />
      <Box height="75vh">
        <Box sx={{ mt: "1rem" }}>
          <RaidSelector
            selectedRaid={selectedRaid}
            setSelectedRaid={setSelectedRaid}
          />
          <FormControl sx={{ ml: "1rem" }}>
            <InputLabel>Stat</InputLabel>
            <Select
              value={view}
              label="View"
              onChange={(e) => setView(e.target.value)}
            >
              {statItems.map(({ text, value }) => {
                return (
                  <MenuItem
                    value={value}
                    key={value}
                  >
                    {text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ ml: "1rem", width: "100px" }}>
            <Slider
              id="silder-max"
              size="medium"
              aria-label="Max"
              defaultValue={15}
              // value={max}
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
        </Box>
        <RaidsChart
          view={view}
          raid_id={selectedRaid ? selectedRaid : raidInfoList[0]["id"]}
          max={max}
        />
      </Box>
    </Box>
  );
};

export default Raids;
