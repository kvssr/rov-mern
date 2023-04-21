import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "components/Header";
import PersonalChart from "components/PersonalChart";
import { useTheme } from "@mui/material";
import {
  useGetRaidsQuery,
  useGetCharacterRaidStatsQuery,
  useGetStatTypesQuery,
} from "state/api";
import LinearProgress from "@mui/material/LinearProgress";

const statItems = [
  {
    text: "Damage",
    value: "dmg",
  },
  {
    text: "Boonrips",
    value: "rips",
  },
  {
    text: "Cleanses",
    value: "cleanses",
  },
  {
    text: "Heals",
    value: "heal",
  },
  {
    text: "Distance to tag",
    value: "dist",
  },
  {
    text: "Stability",
    value: "stab",
  },
  {
    text: "Protection",
    value: "prot",
  },
  {
    text: "Aegis",
    value: "aegis",
  },
  {
    text: "Regeneration",
    value: "regen",
  },
  {
    text: "Might",
    value: "might",
  },
  {
    text: "Fury",
    value: "fury",
  },
];

const Personal = () => {
  const [view, setView] = useState("dmg");
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState([]);
  const { data, isLoading } = useGetCharacterRaidStatsQuery("Gold Congenial");
  const { data: dataStatsList, isLoading: isLoadingStatList } =
    useGetStatTypesQuery();
  console.log("🚀 ~ file: index.jsx:68 ~ Personal ~ data:", selectedRows);
  // console.log("🚀 ~ file: index.jsx:68 ~ Personal ~ data:", data);
  useEffect((data) => {
    if (data) {
      let ids = [];
      data.characterRaidInfo.forEach((raid, i) => {
        ids.push(raid.raidId);
      });
      setSelectedRows(ids);
    }
  }, data);
  if (isLoading || !data || !dataStatsList || isLoadingStatList) {
    console.log("Loading");
    return "Loading...";
  }

  let dataRows = [];
  for (const row of data.characterRaidStats) {
    if (!dataRows[row.raidId]) dataRows[row.raidId] = {};
    dataRows[row.raidId][row.statType.name_json] = row.value;
  }

  let dataRowsValues = [];
  if (!dataRows) return "Loading...";
  dataRows.forEach((value, i) => {
    const raidInfo = data.characterRaidInfo.find((x) => x.raidId === i).raid;
    dataRowsValues.push({
      ...value,
      id: i,
      date: raidInfo.start_date.split("T")[0],
      start_time: raidInfo.start_time.split("T")[1].split(".")[0],
      end_time: raidInfo.end_time.split("T")[1].split(".")[0],
    });
  });
  const columnVisibility = {
    end_time: false,
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      hideable: false,
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 0.5,
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 0.5,
    },
  ];

  dataStatsList.forEach((row, i) => {
    columns.push({
      field: row.name_json,
      headerName: row.name,
      flex: 0.5,
    });
    if (
      ![
        "dmg",
        "rips",
        "cleanses",
        "heal",
        "stab",
        "barrier",
        "fury",
        "might",
        "quick",
      ].includes(row.name_json)
    ) {
      columnVisibility[row.name_json] = false;
    }
  });

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Personal"
        subtitle="Overview of raid performance"
      />
      <Box height="80vh">
        <Box height="40vh">
          <PersonalChart data={dataRowsValues} />
        </Box>
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
            rows={dataRowsValues}
            initialState={{
              columns: {
                columnVisibilityModel: columnVisibility,
              },
            }}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(rowSelectionModel, details) => {
              setSelectedRows(rowSelectionModel);
            }}
            rowSelectionModel={selectedRows}
            slots={{
              toolbar: GridToolbar,
              loadingOverlay: LinearProgress,
            }}
          ></DataGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Personal;
