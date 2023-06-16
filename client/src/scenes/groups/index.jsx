import React, { useState, useRef } from "react";
// import FlexBetween from "components/FlexBetween";
// import Header from "components/Header";
import { Box } from "@mui/material";
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

const Groups = () => {
  const { data, isLoading } = useGetGroupsQuery(88);
  const { data: statslist } = useGetStatTypesQuery();
  const { data: characterList } = useGetCharactersByRaidQuery(88);

  const [selectedFight, setSelectedFight] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const visableColumns = ["Damage", "Boonrips", "Healing", "Stability"];
  const dataGrid = useRef(null);
  console.log("dataGrid", dataGrid);
  // const visibleColumns = dataGrid ? dataGrid.getVisibleColumns() : undefined;
  // console.log("visibleColumns", visibleColumns);

  if (!data || isLoading || !characterList || !statslist) {
    return "Is Loading...";
  }

  const handleSelectionChange = (e) => {
    setSelectedFight(e.addedItems[0].id);
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
      <Box>
        <ButtonGroup
          items={fontStyles}
          keyExpr="id"
          defaultSelectedItemKeys={selectedFight}
          onSelectionChanged={handleSelectionChange}
        />
      </Box>
      <Box mt="2.5rem">
        <DataGrid
          id="dataGrid"
          dataSource={data.length > 0 ? data[selectedFight].characters : []}
          keyExpr="id"
          hoverStateEnabled={true}
          ref={dataGrid}
        >
          {/* Configuration goes here */}
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
                visible={visableColumns.includes(stat.name)}
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
            <GroupItem
              column="1"
              summaryType="sum"
              showInGroupFooter={false}
              alignByColumn={true}
              displayFormat="{0}"
              valueFormat=",##0.##"
            />
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
