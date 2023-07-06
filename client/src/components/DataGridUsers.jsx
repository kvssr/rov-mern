import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useGetAccountRolesQuery, useGetUsersQuery } from "state/api";

const DataGridUsers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUsersQuery();
  const { data: dataRoles } = useGetAccountRolesQuery();
  if (isLoading || !data) return "Loading...";

  const roleOptions = dataRoles.map((role) => {
    return { value: role.id, label: role.name };
  });
  console.log(
    "🚀 ~ file: DataGridUsers.jsx:17 ~ roleOptions ~ roleOptions:",
    roleOptions
  );

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
      field: "accountRoleId",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: roleOptions,
      valueGetter: (row) => {
        if (!row.value) return "";
        return row.value;
      },
      flex: 0.5,
      editable: true,
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
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableExportButton
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      ></DataGrid>
    </Box>
  );
};

export default DataGridUsers;
