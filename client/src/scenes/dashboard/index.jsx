import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import RaidsChart from "components/RaidsChart";
import { useGetRaidsInfoListQuery } from "state/api";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: raidInfoList, isLoading } = useGetRaidsInfoListQuery();
  const [selectedRaid, setSelectedRaid] = useState("");
  if (!raidInfoList || isLoading || raidInfoList.length === 0) {
    return "Is Loading...";
  }

  const handleRaidSelect = (id) => {
    setSelectedRaid(id);
  };

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
    {
      text: "Quickness",
      value: "quick",
    },
    {
      text: "Alacrity",
      value: "alac",
    },
    {
      text: "Superspeed",
      value: "speed",
    },
    {
      text: "Barrier",
      value: "barrier",
    },
    {
      text: "Damage taken",
      value: "dmg_taken",
    },
    {
      text: "Deaths",
      value: "deaths",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Dashboard"
          subtitle="Welcome to the dashboard"
        />
      </FlexBetween>
      <FlexBetween>
        <Box>
          <Select
            value={selectedRaid ? selectedRaid : raidInfoList[0]["id"]}
            label="Raid"
            onChange={(e) => handleRaidSelect(e.target.value)}
          >
            {raidInfoList.map((raid) => {
              const start_date = raid["start_date"].split("T")[0];
              const start_time = raid["start_time"].split("T")[1].split(".")[0];
              const end_time = raid["end_time"].split("T")[1].split(".")[0];
              const text = `${start_date} | ${start_time} - ${end_time}`;
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
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="270px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {statItems.map(({ text, value }) => {
          return (
            <Box
              gridColumn="span 6"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              pb="1rem"
              key={text}
            >
              <Typography
                fontWeight="bold"
                fontSize="1rem"
                sx={{ color: theme.palette.secondary[100] }}
                justifyContent="center"
                display="flex"
              >
                {text}
              </Typography>
              <RaidsChart
                isDashboard={true}
                view={value}
                raid_id={selectedRaid ? selectedRaid : raidInfoList[0]["id"]}
                max={10}
              ></RaidsChart>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
