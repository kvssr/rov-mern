import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetRaidsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Characters = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetRaidsQuery();
  if (!data || isLoading) return "Is Loading...";
  console.log("data", data[0]);

  const { players } = data[0];
  console.log("players", players);

  const columns = [
    {
      field: "account",
      headerName: "Account",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "profession",
      headerName: "Profession",
      flex: 1,
    },
    {
      field: "num_fights_present",
      headerName: "# fights",
      flex: 0.5,
    },
    {
      field: "attendance_percentage",
      headerName: "Attendance %",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Characters"
        subtitle="List of all characters"
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
          getRowId={(row) => row.average_stats.alac + row.average_stats.dist}
          rows={players || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Characters;
