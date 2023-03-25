import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Button } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbar,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import { UploadFileOutlined } from "@mui/icons-material";
import { usePostRaidLogsQuery } from "state/api";

const ReadFiles = (files) => {
  console.log("files_elm", files);
  const filesArray = Array.from(files);
  console.log("files_array", filesArray);
  usePostRaidLogsQuery(filesArray);
  return "Files added";
};

const DataGridCustomToolbar = () => {
  const [files, setFiles] = useState();
  console.log("files", files);
  ReadFiles(files);
  setFiles();
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
            // onChange={(e) => console.log("Button", e)}
          >
            <UploadFileOutlined />
            Upload
            <input
              hidden
              accept="*/json"
              multiple
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              //   onChange={(e) => console.log(e.target.files)}
            />
          </Button>
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          // onChange={(e) => setSearchInput(e.target.value)}
          // value={searchInput}
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
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
