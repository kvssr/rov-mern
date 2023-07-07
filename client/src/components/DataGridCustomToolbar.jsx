import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import {
  DialogProps,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  DialogContentText,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbar,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { UploadFileOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { useAddRaidLogsMutation, useDeleteRaidLogsMutation } from "state/api";

const DataGridCustomToolbar = (props) => {
  const [addFile] = useAddRaidLogsMutation();
  const [deleteRow] = useDeleteRaidLogsMutation();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState();
  const [raidType, setRaidType] = useState(1);
  const [raidName, setRaidName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setRaidName(event.target.value);
  };

  const handleSave = () => {
    setOpen(false);
    console.log("Raid name", raidName);
    console.log("Raid type", raidType);
    console.log("Raid file", files);
    fileUploadHandler();
  };

  const handleRaidTypeChange = (event) => {
    setRaidType(event.target.value);
  };

  const handleFilesChange = (event) => {
    setFiles(event.target.files);
    setOpen(true);
  };

  console.log("Passed selected Ids:", props.selectedRows);

  const fileUploadHandler = () => {
    console.log("files", files);
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
      new Response(file).json().then(
        (json) => {
          console.log("json", json);
          addFile({ json, raidName, raidType }).then(() => {
            props.setRowAdded(
              json["overall_raid_stats"]["used_fights_duration"]
            );
          });
        },
        (err) => {
          // not json
          console.log("not a json file", err);
        }
      );
    });
  };

  const handleDeleteClicks = () => {
    console.log("delete click getting called");
    props.selectedRows.forEach((row) => {
      console.log("Deleting row", row);
      deleteRow(row);
    });
  };

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Button
            variant="text"
            component="label"
          >
            <UploadFileOutlined />
            Upload
            <input
              hidden
              accept="*/json"
              // multiple
              type="file"
              onChange={handleFilesChange}
            />
          </Button>
          <Button
            variant="text"
            component="label"
            onClick={(e) => handleDeleteClicks()}
          >
            <DeleteOutlineOutlined />
            Delete
          </Button>
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Raid info</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FlexBetween gap="1.5rem">
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <TextField
                  id="raid-name"
                  label="Title"
                  variant="outlined"
                  value={raidName}
                  onChange={handleNameChange}
                />
              </FormControl>
              <FormControl sx={{ mt: 2, minWidth: 120 }}>
                <InputLabel id="raidtype-select">RaidType</InputLabel>
                <Select
                  labelId="raidtype-select"
                  label="RaidType"
                  value={raidType}
                  onChange={handleRaidTypeChange}
                >
                  <MenuItem value={1}>Unknown</MenuItem>
                  <MenuItem value={2}>Morning</MenuItem>
                  <MenuItem value={3}>Afternoon</MenuItem>
                  <MenuItem value={4}>Guild</MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
