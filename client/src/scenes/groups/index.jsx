import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  useGetGroupsQuery,
  useGetCharactersByRaidQuery,
  useGetStatTypesQuery,
} from "state/api";
import {
  DataGrid,
  Column,
  GroupPanel,
  Toolbar,
  Item,
  Grouping,
  Paging,
  ColumnChooser,
  SearchPanel,
  Summary,
  GroupItem,
  ColumnFixing,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.dark.css";
import { Button } from "devextreme-react/button";
import ProfessionIcon from "assets/profession_icons/ProfessionIcon";
import RaidSelector from "components/RaidSelector";
import { useEffect } from "react";
import Header from "components/Header";
import { useSelector } from "react-redux";
import Pagination from "components/Pagination";

const Groups = () => {
  const [selectedRaid, setSelectedRaid] = useState(-1);
  const { data, isLoading } = useGetGroupsQuery(selectedRaid);
  const { data: statslist } = useGetStatTypesQuery();
  const { data: characterList, isLoading: characterLoading } =
    useGetCharactersByRaidQuery(selectedRaid);

  const [selectedFight, setSelectedFight] = useState(1);
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();
  const statBlacklist = useSelector((state) => state.global.statBlacklist);

  const visibleColumns = ["Damage", "Boonrips", "Healing", "Stability"];

  useEffect(() => {
    setSelectedFight(1);
  }, [selectedRaid]);

  if (!data || isLoading || characterLoading || !statslist) {
    return "Is Loading...";
  }

  const handleSelectionChange = (e) => {
    console.log("change e", e);
    const id = e.addedItems[0].id;
    if (id === "back") {
      setSelectedFight(selectedFight - 1);
    } else if (id === "next") {
      setSelectedFight(selectedFight + 1);
    } else {
      setSelectedFight(e.addedItems[0].id);
    }
  };

  const statslistFiltered = statslist.filter(
    (item) => statBlacklist.includes(item.name) === false
  );

  const fontStyles = [];

  data.forEach((fight) => {
    fontStyles.push({
      id: fight.fight_number,
      text: fight.fight_number + 1,
    });
  });

  const getCharacterName = (cellData) => {
    if (!characterList[cellData.key]) return "";
    const prof = characterList[cellData.key].profession.name;
    return (
      <div>
        {ProfessionIcon(prof, 15)}
        {characterList[cellData.key].name}
      </div>
    );
  };

  return (
    <Box m="1.5rem 2.5rem">
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
      <Box>
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
      </Box>
      <Box mt="2.5rem">
        <DataGrid
          id="dataGrid"
          dataSource={data.length > 0 ? data[selectedFight - 1].characters : []}
          keyExpr="id"
          hoverStateEnabled={true}
          columnAutoWidth={true}
        >
          <Column
            dataField={"id"}
            caption="Character"
            cellRender={getCharacterName}
            allowHiding={false}
            fixed={true}
          ></Column>
          {statslistFiltered.map((stat) => {
            return (
              <Column
                dataField={stat.id.toString()}
                caption={stat.name}
                visible={visibleColumns.includes(stat.name)}
                format=",##0.##"
                key={stat.id}
              ></Column>
            );
          })}
          <Column
            dataField="group"
            groupIndex={0}
          ></Column>
          <Paging enabled={false} />
          <ColumnFixing enabled={true} />
          <Grouping
            autoExpandAll={expanded}
            expandMode="rowClick"
          />
          <Summary>
            {statslistFiltered.map((stat) => {
              return (
                <GroupItem
                  column={stat.id.toString()}
                  summaryType="sum"
                  showInGroupFooter={false}
                  alignByColumn={true}
                  displayFormat="{0}"
                  valueFormat=",##0.##"
                  key={stat.id}
                />
              );
            })}
          </Summary>
          <GroupPanel visible={true} />
          <ColumnChooser
            enabled={true}
            mode="select"
            allowSearch={true}
            height={340}
          />
          <SearchPanel visible={true} />
          <Toolbar>
            <Item name="groupPanel" />
            <Item location="after">
              <Button
                text={expanded ? "Collapse All" : "Expand All"}
                width={110}
                onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
              />
            </Item>
            <Item name="columnChooserButton" />
            <Item name="searchPanel" />
          </Toolbar>
        </DataGrid>
      </Box>
    </Box>
  );
};

export default Groups;
