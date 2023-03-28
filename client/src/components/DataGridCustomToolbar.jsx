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
import { UploadFileOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { useAddRaidLogsMutation, useDeleteRaidLogsMutation } from "state/api";

const DataGridCustomToolbar = (props) => {
  const [addFile] = useAddRaidLogsMutation();
  const [deleteRow] = useDeleteRaidLogsMutation();
  console.log("Passed selected Ids:", props.selectedRows);

  const fileUploadHandler = (files) => {
    console.log("files", files);
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
      new Response(file).json().then(
        (json) => {
          console.log("json", json);
          addFile(json);
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
            // onChange={(e) => console.log("Button", e)}
          >
            <UploadFileOutlined />
            Upload
            <input
              hidden
              accept="*/json"
              multiple
              type="file"
              onChange={(e) => fileUploadHandler(e.target.files)}
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
