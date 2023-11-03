import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  useGetGroupsQuery,
  useGetCharactersByRaidQuery,
  useGetStatTypesQuery,
  useGetFightsByRaidQuery,
  useGetProfessionsQuery,
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
  TotalItem,
} from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.dark.css";
import { Button } from "devextreme-react/button";
import ProfessionIcon, {
  ProfessionIconLink,
} from "assets/profession_icons/ProfessionIcon";
import RaidSelector from "components/RaidSelector";
import { useEffect } from "react";
import Header from "components/Header";
import { useSelector } from "react-redux";
import Pagination from "components/Pagination";
import { PieChart, ResponsiveBox } from "devextreme-react";
import {
  Annotation,
  Border,
  CommonAnnotationSettings,
  Image,
  Legend,
  Series,
} from "devextreme-react/pie-chart";
import { Col, Location, Row } from "devextreme-react/responsive-box";
import { Font, Label } from "devextreme-react/chart";

const Groups = () => {
  const [selectedRaid, setSelectedRaid] = useState(-1);
  // console.log("🚀 ~ file: index.jsx:49 ~ Groups ~ selectedRaid:", selectedRaid);
  const { data, isFetching } = useGetGroupsQuery(selectedRaid);
  const { data: statslist } = useGetStatTypesQuery();
  const { data: professions } = useGetProfessionsQuery();
  const { data: fightsInfo } = useGetFightsByRaidQuery(selectedRaid);
  const { data: characterList, isFetching: characterLoading } =
    useGetCharactersByRaidQuery(selectedRaid);
  // console.log(
  //   "🚀 ~ file: index.jsx:55 ~ Groups ~ characterList:",
  //   characterList
  // );

  const [selectedFight, setSelectedFight] = useState(1);
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();
  const statBlacklist = useSelector((state) => state.global.statBlacklist);

  const visibleColumns = [
    "Damage Total",
    "Strips",
    "Healing Total",
    "Cleanses",
    "Stability",
    "Deaths",
  ];

  useEffect(() => {
    setSelectedFight(1);
  }, [selectedRaid]);

  if (!data || isFetching || characterLoading || !statslist || !fightsInfo) {
    return "Is Loading...";
  }
  // console.log("data groups", data);
  const selectedFightInfo = fightsInfo[selectedFight - 1];
  // console.log("SelectedFightInfo", selectedFightInfo);
  let fightGridData = [{ Type: "Total" }, { Type: "Average" }];
  if (selectedFightInfo) {
    selectedFightInfo.fightStats.forEach((stat) => {
      fightGridData[stat.valueTypeId - 1][stat.statTypeId] = stat.value;
    });
  }

  // console.log("fightGridData", fightGridData);

  const handleSelectionChange = (e) => {
    // console.log("change e", e);
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

  const profList = [];
  const profDist = [];
  if (data.length > 0 && characterList) {
    data[selectedFight - 1].characters.forEach((row) => {
      const character = characterList[row.id];
      if (character) {
        if (profList.includes(character.profession.name)) {
          let dist = profDist.find(
            (dist) => dist.prof === character.profession.name
          );
          dist.value += 1;
        } else {
          profList.push(character.profession.name);
          profDist.push({
            prof: character.profession.name,
            value: 1,
          });
        }
      }
    });
  }

  // console.log("profDist: ", profList);
  // console.log("profDist: ", profDist);

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

  const customizePoint = (point) => {
    const profName = point.argument;
    const prof = professions.find((p) => p.name === profName);
    return { color: prof.color };
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
              <DataGrid
                id="dg-fightInfo"
                dataSource={fightsInfo.length > 0 ? [selectedFightInfo] : []}
                keyExpr="id"
                hoverStateEnabled={true}
                columnAutoWidth={true}
              >
                <Column
                  dataField={"start_time"}
                  caption="Start Time"
                  customizeText={(text) => {
                    return new Date(text.value).toLocaleTimeString();
                  }}
                ></Column>
                <Column
                  dataField={"end_time"}
                  caption="End Time"
                  customizeText={(text) => {
                    return new Date(text.value).toLocaleTimeString();
                  }}
                ></Column>
                <Column
                  dataField={"allies"}
                  caption="Allies"
                ></Column>
                <Column
                  dataField={"enemies"}
                  caption="Enemies"
                ></Column>
                <Column
                  dataField={"kills"}
                  caption="Kills"
                ></Column>
                <Column
                  dataField={"deaths"}
                  caption="Deaths"
                ></Column>
              </DataGrid>
            </Box>
          </Box>
        </Item>
        <Item>
          <Location
            row={0}
            col={1}
          />
          <PieChart
            id="pie"
            dataSource={profDist}
            customizePoint={customizePoint}
          >
            <CommonAnnotationSettings
              type="image"
              color="transparent"
              paddingLeftRight={0}
              paddingTopBottom={-25}
            >
              <Image
                height={20}
                width={20}
              />
            </CommonAnnotationSettings>
            {profDist.map((item) => (
              <Annotation
                key={item.prof}
                argument={item.prof}
                data={item.value}
              >
                <Image url={ProfessionIconLink(item.prof)} />
                <Border visible={false} />
              </Annotation>
            ))}
            <Series
              argumentField="prof"
              valueField="value"
            >
              <Label
                visible
                position="inside"
                radialOffset={30}
                backgroundColor="transparent"
              >
                <Font
                  size={16}
                  weight={600}
                />
              </Label>
            </Series>
            <Legend verticalAlignment="Middle"></Legend>
          </PieChart>
        </Item>
        <Item>
          <Location
            row={1}
            col={0}
            colspan={2}
          />
          <DataGrid
            id="dataGrid"
            dataSource={
              data.length > 0 ? data[selectedFight - 1].characters : []
            }
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
                  alignment="right"
                  visible={visibleColumns.includes(stat.name)}
                  format=",##0.##"
                  customizeText={(option) => {
                    return option.value ? option.valueText : "0";
                  }}
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
                return [
                  <GroupItem
                    column={stat.id.toString()}
                    summaryType="sum"
                    showInGroupFooter={false}
                    alignByColumn={true}
                    displayFormat="{0}"
                    valueFormat=",##0.##"
                    key={stat.id}
                  />,
                  <TotalItem
                    column={stat.id.toString()}
                    summaryType="avg"
                    valueFormat=",##0.##"
                    alignment="right"
                    displayFormat="Avg {0}"
                  />,
                  <TotalItem
                    column={stat.id.toString()}
                    summaryType="sum"
                    valueFormat=",##0.00"
                    alignment="right"
                    displayFormat="Total {0}"
                  />,
                ];
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
        </Item>
      </ResponsiveBox>
    </Box>
  );
};

export default Groups;
