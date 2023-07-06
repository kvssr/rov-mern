import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAccountRolesQuery } from "state/api";

const DataGridRoles = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAccountRolesQuery();
  if (isLoading || !data) {
    return "Loading...";
  }

  console.log("🚀 ~ file: index.jsx:13 ~ Users ~ data:", data);
  const columns = [
    {
      field: "id",
      headerName: "Id",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "power",
      headerName: "Power",
      flex: 0.5,
    },
  ];
  return (
    <Box
      mt="30px"
      mb="20px"
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
        autoHeight
        rowHeight={30}
      ></DataGrid>
    </Box>
  );
};

export default DataGridRoles;
