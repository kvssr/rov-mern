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
import { Button } from "devextreme-react/button";
import ProfessionIcon from "assets/profession_icons/ProfessionIcon";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetStatTypesQuery } from "state/api";
import { CircularProgress } from "@mui/material";

const visibleColumns = [
  "Damage Total",
  "Strips",
  "Healing Total",
  "Cleanses",
  "Stability",
  "Deaths",
];

const GroupsTable = ({ data, characterList }) => {
  const [expanded, setExpanded] = useState(true);
  const { data: statslist } = useGetStatTypesQuery();
  const statBlacklist = useSelector((state) => state.global.statBlacklist);

  if (!data || !characterList || !statslist) {
    return <CircularProgress color="info" />;
  }

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

  const statslistFiltered = statslist.filter(
    (item) => statBlacklist.includes(item.name) === false
  );
  return (
    <DataGrid
      id="dataGrid"
      dataSource={data.length > 0 ? data : []}
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
  );
};

export default GroupsTable;
