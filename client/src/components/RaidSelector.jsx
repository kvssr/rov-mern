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
          const start_date = raid["start_date"].split("T")[0];
          const start_time = raid["start_time"].split("T")[1].split(".")[0];
          //   const end_time = raid["end_time"].split("T")[1].split(".")[0];
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
