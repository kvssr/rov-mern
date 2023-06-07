import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "components/Header";
import PersonalChart from "components/PersonalChart";
import { useTheme, Autocomplete, TextField } from "@mui/material";
import {
  useGetCharacterRaidStatsQuery,
  useGetStatTypesQuery,
  useGetCharactersQuery,
} from "state/api";
import LinearProgress from "@mui/material/LinearProgress";
import FlexBetween from "components/FlexBetween";

const Personal = ({ id = null, stat = null }) => {
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedStat, setSelectedStat] = useState(stat);
  const { data: characterList } = useGetCharactersQuery();
  const { data: dataStatsList, isLoading: isLoadingStatList } =
    useGetStatTypesQuery();
  const [selectedCharacter, setSelectedCharacter] = useState(id);
  const { data, isLoading } = useGetCharacterRaidStatsQuery({
    id: selectedCharacter ? selectedCharacter.id : -1,
    stat: -1,
  });

  useEffect(() => {
    if (data) {
      let ids = [];
      data.characterRaidInfo.forEach((raid, i) => {
        ids.push(raid.raidId);
      });
      setSelectedRows(ids);
    }
  }, [data]);

  if (
    isLoading ||
    !data ||
    !dataStatsList ||
    isLoadingStatList ||
    !characterList
  ) {
    return "Loading...";
  }

  const dropDownOptionsChar = characterList.map((character) => {
    return {
      label: `${character.name} (${character.profession.name})`,
      id: character.id,
    };
  });

  const dropDownOptionsStat = dataStatsList.map((stat) => {
    return {
      label: stat.name,
      id: stat.id,
      short: stat.name_json,
    };
  });

  // Grouping stats per raid
  let dataRows = [];
  for (const row of data.characterRaidStats) {
    if (!dataRows[row.raidId]) dataRows[row.raidId] = {};
    dataRows[row.raidId][row.statType.name_json] = row.value;
  }

  // Creating tablerows
  let dataRowsValues = {
    character: data.name,
    account: data.account,
    profession: data.profession,
    raids: [],
  };
  if (!dataRows) return "Loading...";
  dataRows.forEach((value, i) => {
    const raidInfo = data.characterRaidInfo.find((x) => x.raidId === i).raid;
    dataRowsValues.raids.push({
      ...value,
      id: i,
      date: raidInfo.start_date.split("T")[0],
      start_time: raidInfo.start_time.split("T")[1].split(".")[0],
      end_time: raidInfo.end_time.split("T")[1].split(".")[0],
    });
  });

  // Sort the raid by date
  dataRowsValues.raids.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
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
    <Box
      display="grid"
      m="1.5rem 2.5rem"
      gridTemplateColumns="repeat(12, 1fr)"
      sx={{
        "& > div": { gridColumn: "span 12" },
      }}
    >
      <FlexBetween>
        <Header
          title="Personal"
          subtitle="Overview of raid performance"
        />
        <Autocomplete
          disablePortal
          id="combo-box-characters"
          options={dropDownOptionsChar}
          value={selectedCharacter}
          onChange={(event, newValue) => {
            setSelectedCharacter(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Character"
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-stats"
          options={dropDownOptionsStat}
          value={selectedStat}
          onChange={(event, newValue) => {
            setSelectedStat(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Stat"
            />
          )}
        />
      </FlexBetween>
      <Box height="80vh">
        <Box height="40vh">
          <PersonalChart
            data={dataRowsValues}
            selectedRows={selectedRows}
            selectedStat={selectedStat}
          />
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
            rows={dataRowsValues.raids}
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
