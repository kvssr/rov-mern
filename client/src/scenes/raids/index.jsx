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
import { useTheme } from "@mui/material";
import { useGetRaidsInfoListQuery, useGetRaidByIdQuery } from "state/api";

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
  const { data: raidInfoList, isLoading } = useGetRaidsInfoListQuery();
  const [selectedRaid, setSelectedRaid] = useState("");
  const { data: raidData } = useGetRaidByIdQuery(
    selectedRaid ? selectedRaid : raidInfoList ? raidInfoList[0]["_id"] : "-1"
  );

  if (!raidInfoList || isLoading) {
    return "Is Loading...";
  }

  const handleRaidSelect = (id) => {
    setSelectedRaid(id);
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Overview"
        subtitle="Overview of Raid"
      />
      <Box height="80vh">
        <FormControl sx={{ m: "1rem" }}>
          <InputLabel>Raid</InputLabel>
          <Select
            value={selectedRaid ? selectedRaid : raidInfoList[0]["_id"]}
            label="Raid"
            onChange={(e) => handleRaidSelect(e.target.value)}
          >
            {raidInfoList.map((raid) => {
              const info = raid["overall_raid_stats"];
              const text = `${info["date"]} | ${info["start_time"]} - ${info["end_time"]}`;
              return <MenuItem value={raid["_id"]}>{text}</MenuItem>;
            })}
          </Select>
        </FormControl>
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
          data={raidData ? raidData["top_total_players"][view] : undefined}
          players={raidData ? raidData["players"] : undefined}
          max={max}
        />
      </Box>
    </Box>
  );
};

export default Raids;
