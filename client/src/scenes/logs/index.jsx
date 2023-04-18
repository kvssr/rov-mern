import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetRaidsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Logs = () => {
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowAdded, setRowAdded] = useState("");
  const { data, isLoading } = useGetRaidsQuery();
  if (isLoading || !data) {
    console.log("Loading");
    return "Loading...";
  }

  // const newData = data.map(({ _id, overall_raid_stats }) => {
  //   return { ...overall_raid_stats, _id };
  // });
  console.log("Data log", data);

  const columns = [
    {
      field: "start_date",
      headerName: "Date",
      flex: 0.5,
      type: "dateTime",
      valueFormatter: (param) => {
        if (param.value == null) {
          return "";
        }
        const valueFormatted = param.value.split("T")[0];
        return `${valueFormatted}`;
      },
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 0.5,
      type: "dateTime",
      valueFormatter: (param) => {
        if (param.value == null) {
          return "";
        }
        const valueFormatted = param.value.split("T")[1].split(".")[0];
        return `${valueFormatted}`;
      },
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 0.5,
      type: "dateTime",
      valueFormatter: (param) => {
        if (param.value == null) {
          return "";
        }
        const valueFormatted = param.value.split("T")[1].split(".")[0];
        return `${valueFormatted}`;
      },
    },
    {
      field: "name",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "raidType",
      headerName: "Type",
      flex: 0.5,
      valueFormatter: (param) => {
        if (param.value == null) {
          return "";
        }
        const valueFormatted = param.value["name"];
        return `${valueFormatted}`;
      },
    },
    {
      field: "total_kills",
      headerName: "Kills",
      flex: 0.5,
    },
    {
      field: "mean_allies",
      headerName: "Mean Allies",
      flex: 0.5,
    },
    {
      field: "mean_enemies",
      headerName: "Mean Enemies",
      flex: 0.5,
    },
  ];
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="LOGS"
        subtitle="logs of all the raids"
      />
      <Box
        mt="30px"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "& .css-h9yzkj-MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .css-h9yzkj-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
            {
              color: theme.palette.secondary[100],
            },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          rows={data}
          columns={columns}
          checkboxSelection
          // components={{ Toolbar: DataGridCustomToolbar }}
          onRowSelectionModelChange={(rowSelectionModel, details) => {
            setSelectedRows(rowSelectionModel);
          }}
          slots={{
            toolbar: DataGridCustomToolbar,
          }}
          slotProps={{
            toolbar: {
              selectedRows: selectedRows,
              setRowAdded: { setRowAdded },
            },
          }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Logs;
