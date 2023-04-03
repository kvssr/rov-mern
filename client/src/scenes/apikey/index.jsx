import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { PersonOutlineOutlined } from "@mui/icons-material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCharactersQuery, useGetAccountQuery } from "state/gwapi";
import { useGetRaidsQuery, useAddAccountMutation } from "state/api";

const ApiKey = () => {
  // const apikeylocal = JSON.parse(localStorage.getItem("apikey"));
  // console.log("local key", apikeylocal);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();

  const [textkey, setTextkey] = useState();
  const [apikey, setApikey] = useState();
  const [skip, setSkip] = useState(true);
  const [characters, setCharacters] = useState();

  const { data, isLoading } = useGetCharactersQuery(apikey, { skip: skip });
  const { data: accountData, isLoading: accountLoading } = useGetAccountQuery(
    apikey,
    { skip: skip }
  );
  const [addAccount] = useAddAccountMutation();

  useEffect(() => {
    if (data) {
      console.log("Effect data", data);
      setCharacters(data);
      localStorage.setItem("characters", JSON.stringify(data));
    } else if (!characters) {
      console.log("Effect data no characters", characters);
      if (localStorage.getItem("characters")) {
        setCharacters(JSON.parse(localStorage.getItem("characters")));
      }
    }
  }, data);

  useEffect(() => {
    if (accountData) {
      console.log("Effect account", accountData);
      localStorage.setItem("accountId", JSON.stringify(accountData["id"]));
      addAccount(accountData);
    }
  }, accountData);

  console.log("characters", characters);

  const handleSubmitClick = () => {
    localStorage.setItem("apikey", JSON.stringify(textkey));
    setApikey(textkey);
    setSkip(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="API Key"
        subtitle="Here you can add your API key"
      />
      <Box m="1.5rem 2.5rem">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Box>
      <Box>
        <TextField
          id="api-key-input"
          label="Api key"
          variant="outlined"
          defaultValue={apikey}
          sx={{ width: isNonMobile ? "630px" : "100%" }}
          onChange={(e) => setTextkey(e.target.value)}
        />
        <Button
          variant="outlined"
          sx={{ m: "0.5rem 1rem", color: theme.palette.secondary[100] }}
          onClick={(e) => {
            handleSubmitClick();
          }}
        >
          Submit
        </Button>
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
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: theme.palette.primary[500],
          }}
          subheader={<ListSubheader>Characters</ListSubheader>}
        >
          {characters &&
            characters.map((character) => {
              return (
                <ListItem
                  id={`switch-list-item-${character}`}
                  key={character}
                >
                  <ListItemIcon>
                    <PersonOutlineOutlined />
                  </ListItemIcon>
                  <ListItemText
                    id={`switch-list-label-${character}`}
                    primary={character}
                  />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Box>
  );
};

export default ApiKey;
