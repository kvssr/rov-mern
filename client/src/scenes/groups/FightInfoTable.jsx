import { CircularProgress } from "@mui/material";
import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/data-grid";
import { useGetFightsByRaidQuery } from "state/api";

const FightInfoTable = ({ selectedRaid, selectedFight }) => {
  const { data: fightsInfo, isFetching } =
    useGetFightsByRaidQuery(selectedRaid);

  if (isFetching) {
    return <CircularProgress color="info" />;
  }
  const selectedFightInfo = fightsInfo[selectedFight - 1];
  // console.log("SelectedFightInfo", selectedFightInfo);
  // let fightGridData = [{ Type: "Total" }, { Type: "Average" }];
  // if (selectedFightInfo) {
  //   selectedFightInfo.fightStats.forEach((stat) => {
  //     fightGridData[stat.valueTypeId - 1][stat.statTypeId] = stat.value;
  //   });
  // }
  // console.log("fightGridData", fightGridData);

  return (
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
  );
};

export default FightInfoTable;
