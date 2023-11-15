import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetGroupsQuery, useGetCharactersByRaidQuery } from "state/api";

import "devextreme/dist/css/dx.dark.css";

import RaidSelector from "components/RaidSelector";
import { useEffect } from "react";
import Header from "components/Header";
import Pagination from "components/Pagination";
import { ResponsiveBox } from "devextreme-react";
import { Col, Location, Row } from "devextreme-react/responsive-box";
import FightInfoTable from "./FightInfoTable";
import ProfPieChart from "./ProfPieChart";
import { Item } from "devextreme-react/box";
import GroupsTable from "./GroupsTable";

const Groups = () => {
  const [selectedRaid, setSelectedRaid] = useState(-1);
  const { data, isFetching } = useGetGroupsQuery(selectedRaid);
  const [selectedFight, setSelectedFight] = useState(1);
  const theme = useTheme();

  const { data: characterList, isFetching: characterLoading } =
    useGetCharactersByRaidQuery(selectedRaid);

  useEffect(() => {
    setSelectedFight(1);
  }, [selectedRaid]);

  if (!data || isFetching || characterLoading) {
    return "Is Loading...";
  }

  const handleSelectionChange = (e) => {
    const id = e.addedItems[0].id;
    if (id === "back") {
      setSelectedFight(selectedFight - 1);
    } else if (id === "next") {
      setSelectedFight(selectedFight + 1);
    } else {
      setSelectedFight(e.addedItems[0].id);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <ResponsiveBox singleColumnScreen="xs sm">
        <Row ratio={1} />
        <Row ratio={5} />
        <Col ratio={2} />
        <Col ratio={1} />

        <Item>
          <Location
            row={0}
            col={0}
          />
          <Box>
            <Header
              title="Groups"
              subtitle="group composition per fight"
            />
            <Box
              mb="1.5rem"
              mt="1.5rem"
            >
              <RaidSelector
                selectedRaid={selectedRaid}
                setSelectedRaid={setSelectedRaid}
              />
            </Box>
            <Typography
              variant="h6"
              color={theme.palette.secondary[300]}
              sx={{ mb: "5px" }}
            >
              {"Fight #"}
            </Typography>
            <Pagination
              currentPage={selectedFight}
              pages={data.length}
              onPageChange={handleSelectionChange}
            />
            <Box mt="1.5rem">
              <FightInfoTable
                selectedFight={selectedFight}
                selectedRaid={selectedRaid}
              />
            </Box>
          </Box>
        </Item>
        <Item>
          <Location
            row={0}
            col={1}
          />
          <ProfPieChart
            characters={
              data[selectedFight - 1] ? data[selectedFight - 1].characters : []
            }
            characterList={characterList}
          />
        </Item>
        <Item>
          <Location
            row={1}
            col={0}
            colspan={2}
          />
          <GroupsTable
            data={
              data[selectedFight - 1] ? data[selectedFight - 1].characters : []
            }
            characterList={characterList}
          />
        </Item>
      </ResponsiveBox>
    </Box>
  );
};

export default Groups;
