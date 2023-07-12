import { Alert, Box, Snackbar, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useState } from "react";
import {
  useGetAccountRolesQuery,
  useGetUsersQuery,
  useUpdateAccountMutation,
} from "state/api";

const DataGridUsers = () => {
  const theme = useTheme();
  const [updateRole] = useUpdateAccountMutation();
  const { data, isLoading } = useGetUsersQuery();
  const { data: dataRoles } = useGetAccountRolesQuery();
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = async (newRow) => {
    // const id = newRow.id;
    const name = newRow.name;
    const accountRoleId = newRow.accountRoleId;
    const response = await updateRole({ name, accountRoleId });
    setSnackbar({ children: "User successfully saved", severity: "success" });
    return response.data;
  };

  if (isLoading || !data || !dataRoles) return "Loading...";

  const roleOptions = dataRoles.map((role) => {
    return { value: role.id, label: role.name };
  });
  console.log(
    "🚀 ~ file: DataGridUsers.jsx:17 ~ roleOptions ~ roleOptions:",
    roleOptions
  );

  const handleProcessRowUpdateError = (error) => {
    setSnackbar({ children: error.message, severity: "error" });
  };

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
      onselectionchange: (e) => {
        console.log("change,", e);
      },
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
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
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
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert
            {...snackbar}
            onClose={handleCloseSnackbar}
          />
        </Snackbar>
      )}
    </Box>
  );
};

export default DataGridUsers;
