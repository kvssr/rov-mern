import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetRaidsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Logs = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetRaidsQuery();
  if (isLoading || !data) {
    return "Loading...";
  }

  const newData = data.map(({ _id, overall_raid_stats }) => {
    return { ...overall_raid_stats, _id };
  });
  console.log("newData", newData);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 1,
    },
    {
      field: "num_used_fights",
      headerName: "used fights",
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
          getRowId={(row) => row._id}
          rows={newData}
          columns={columns}
          checkboxSelection
          components={{ Toolbar: DataGridCustomToolbar }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Logs;
