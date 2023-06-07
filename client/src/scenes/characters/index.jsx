import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCharactersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Characters = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCharactersQuery();
  if (!data || isLoading) return "Is Loading...";
  console.log("data", data);

  // console.log("players", players);

  let players = [];

  for (const character of data) {
    players.push({
      id: character.id,
      name: character.name,
      account: character.account.name,
      profession: character.profession.name,
      num_raids: character.characterRaidInfo.length,
    });
  }

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
      field: "num_raids",
      headerName: "# raids",
      flex: 0.5,
    },
  ];

  return (
    <Box
      display="grid"
      m="1.5rem 2.5rem"
      gridTemplateColumns="repeat(12, 1fr)"
      sx={{
        "& > div": { gridColumn: "span 12" },
      }}
    >
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
          // getRowId={}
          rows={players || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Characters;
