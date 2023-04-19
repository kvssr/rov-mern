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
import { ViewAgendaSharp } from "@mui/icons-material";

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
  const { data: raidData } = useGetRaidByIdQuery({
    id: selectedRaid
      ? selectedRaid
      : raidInfoList
      ? raidInfoList[0]["id"]
      : "-1",
    stat: view,
  });
  console.log("🚀 ~ file: index.jsx:69 ~ Raids ~ raidData:", raidData);

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
            value={selectedRaid ? selectedRaid : raidInfoList[0]["id"]}
            label="Raid"
            onChange={(e) => handleRaidSelect(e.target.value)}
          >
            {raidInfoList.map((raid) => {
              // const info = raid["overall_raid_stats"];
              const start_date = raid["start_date"].split("T")[0];
              const start_time = raid["start_time"].split("T")[1].split(".")[0];
              const end_time = raid["end_time"].split("T")[1].split(".")[0];
              const text = `${start_date} | ${start_time} - ${end_time}`;
              return <MenuItem value={raid["id"]}>{text}</MenuItem>;
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
        <RaidsChart
          view={view}
          data={raidData ? raidData : undefined}
          players={raidData ? raidData : undefined}
          max={max}
        />
      </Box>
    </Box>
  );
};

export default Raids;
