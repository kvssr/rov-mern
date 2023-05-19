import React, { useState } from "react";
// import FlexBetween from "components/FlexBetween";
// import Header from "components/Header";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetGroupsQuery } from "state/api";
import { ButtonGroup } from "devextreme-react/button-group";
import { DataGrid, Column, GroupPanel } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.dark.css";

const Groups = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetGroupsQuery(14);
  const [selectedFight, setSelectedFight] = useState(1);

  if (!data || isLoading) {
    return "Is Loading...";
  }

  const handleSelectionChange = (e) => {
    setSelectedFight(e.addedItems[0].id);
  };

  console.log("data", data);
  console.log("selected fight", selectedFight);

  const fontStyles = [];

  data.forEach((fight) => {
    fontStyles.push({
      id: fight.fight_number + 1,
      text: fight.fight_number + 1,
    });
  });

  return (
    <Box
      m="1.5rem 2.5rem"
      centered
    >
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
          dataSource={data[selectedFight].characters}
          keyExpr="id"
        >
          {/* Configuration goes here */}
          <Column dataField={"id"}></Column>
          <Column dataField={"1"}></Column>
          <Column dataField={"2"}></Column>
          <Column dataField={"3"}></Column>
          <Column dataField={"4"}></Column>
          <Column
            dataField="group"
            groupIndex={0}
          ></Column>
          <GroupPanel visible={true} />
        </DataGrid>
      </Box>
    </Box>
  );
};

export default Groups;
