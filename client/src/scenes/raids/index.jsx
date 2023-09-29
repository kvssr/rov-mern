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
import RaidsChart from "components/RaidsChartExtreme";
import { useGetRaidsInfoListQuery, useGetStatTypesQuery } from "state/api";
import RaidSelector from "components/RaidSelector";
import { useSelector } from "react-redux";

const Raids = () => {
  const [selectedRaid, setSelectedRaid] = useState(-1);
  const [view, setView] = useState("dmg");
  const [order, setOrder] = useState("Desc");
  const [orderBy, setOrderBy] = useState("Total");
  const [max, setMax] = useState(15);
  const { data: raidInfoList, isLoading } = useGetRaidsInfoListQuery();
  const { data: statTypes } = useGetStatTypesQuery();
  const statBlacklist = useSelector((state) => state.global.statBlacklist);

  if (!raidInfoList || isLoading || !statTypes) {
    return "Is Loading...";
  }

  const statTypesFiltered = statTypes.filter(
    (item) => statBlacklist.includes(item.name) === false
  );
  const statItems = statTypesFiltered.map((item) => {
    return { text: item.name, value: item.name_json };
  });

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
          <FormControl sx={{ ml: "1rem" }}>
            <InputLabel>Order By</InputLabel>
            <Select
              value={orderBy}
              label="OrderBy"
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <MenuItem
                value="Total"
                key="Total"
              >
                Total
              </MenuItem>
              <MenuItem
                value="Avg"
                key="Avg"
              >
                Average
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ ml: "1rem" }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={order}
              label="Order"
              onChange={(e) => setOrder(e.target.value)}
            >
              <MenuItem
                value="Asc"
                key="Asc"
              >
                Ascending
              </MenuItem>
              <MenuItem
                value="Desc"
                key="Desc"
              >
                Descending
              </MenuItem>
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
          order={order}
          orderBy={orderBy}
        />
      </Box>
    </Box>
  );
};

export default Raids;
