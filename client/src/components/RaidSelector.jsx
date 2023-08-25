import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useGetRaidsInfoListQuery } from "state/api";

const RaidSelector = ({ selectedRaid, setSelectedRaid }) => {
  const { data: raidInfoList, isLoading } = useGetRaidsInfoListQuery();

  console.log("raidInfoList", raidInfoList);
  if (!raidInfoList || isLoading) {
    return "Is Loading...";
  }
  if (selectedRaid === -1) setSelectedRaid(raidInfoList[0]["id"]);

  const handleRaidSelect = (id) => {
    setSelectedRaid(id);
  };

  return (
    <FormControl>
      <InputLabel>Raid</InputLabel>
      <Select
        value={selectedRaid}
        label="Raid"
        onChange={(e) => handleRaidSelect(e.target.value)}
      >
        {raidInfoList.map((raid) => {
          const start_date = new Date(raid["start_date"]).toLocaleDateString();
          const start_time = new Date(raid["start_time"]).toLocaleTimeString();
          const name = raid["name"];
          const text = `${start_date} | ${start_time} | ${name}`;
          return (
            <MenuItem
              value={raid["id"]}
              key={raid["id"]}
            >
              {text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default RaidSelector;
