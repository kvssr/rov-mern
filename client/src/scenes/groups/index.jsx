import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  useGetGroupsQuery,
  useGetCharactersByRaidQuery,
  useGetStatTypesQuery,
} from "state/api";
import { ButtonGroup } from "devextreme-react/button-group";
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
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.dark.css";
import { Button } from "devextreme-react/button";
import ProfessionIcon from "assets/profession_icons/ProfessionIcon";
import RaidSelector from "components/RaidSelector";
import { useEffect } from "react";
import Header from "components/Header";

const Groups = () => {
  const [selectedRaid, setSelectedRaid] = useState(-1);
  const { data, isLoading } = useGetGroupsQuery(selectedRaid);
  const { data: statslist } = useGetStatTypesQuery();
  const { data: characterList, isLoading: characterLoading } =
    useGetCharactersByRaidQuery(selectedRaid);

  const [selectedFight, setSelectedFight] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();

  const visibleColumns = ["Damage", "Boonrips", "Healing", "Stability"];

  useEffect(() => {
    setSelectedFight([0]);
  }, [selectedRaid]);

  if (!data || isLoading || characterLoading || !statslist) {
    return "Is Loading...";
  }

  const handleSelectionChange = (e) => {
    setSelectedFight([e.addedItems[0].id]);
  };

  console.log("data", data);
  console.log("selected fight", selectedFight);
  console.log("characters", characterList);
  console.log("statsList", statslist);

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
        <ButtonGroup
          items={fontStyles}
          keyExpr="id"
          onSelectionChanged={handleSelectionChange}
          selectedItemKeys={selectedFight}
        />
      </Box>
      <Box mt="2.5rem">
        <DataGrid
          id="dataGrid"
          dataSource={data.length > 0 ? data[selectedFight].characters : []}
          keyExpr="id"
          hoverStateEnabled={true}
        >
          <Column
            dataField={"id"}
            caption="Character"
            cellRender={getCharacterName}
            allowHiding={false}
          ></Column>
          {statslist.map((stat) => {
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
          <Grouping
            autoExpandAll={expanded}
            expandMode="rowClick"
          />
          <Summary>
            {statslist.map((stat) => {
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
