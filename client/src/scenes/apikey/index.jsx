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
  Link,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { PersonOutlineOutlined } from "@mui/icons-material";
import Header from "components/Header";
import { useGetCharactersQuery, useGetAccountQuery } from "state/gwapi";
import { useAddAccountMutation } from "state/api";

const ApiKey = ({ setAccountAdded }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();

  const [snackbar, setSnackbar] = useState(null);
  const [open, setOpen] = useState(false);
  const [apikey, setApikey] = useState();
  const [skip, setSkip] = useState(true);
  const [characters, setCharacters] = useState();
  const [addAccount] = useAddAccountMutation();
  const [textkey, setTextkey] = useState(
    apikey || JSON.parse(localStorage.getItem("apikey")) || ""
  );

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleClose = () => {
    setOpen(false);
  };

  const { data, isLoading } = useGetCharactersQuery(apikey, { skip: skip });
  const { data: accountData, isLoading: accountLoading } = useGetAccountQuery(
    apikey,
    { skip: skip }
  );

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
      if (localStorage.getItem("apikey")) {
        setApikey(JSON.parse(localStorage.getItem("apikey")));
      }
    }
  }, [data]);

  useEffect(() => {
    if (accountData) {
      console.log("Effect account", accountData);
      localStorage.setItem("accountId", JSON.stringify(accountData["id"]));
      addAccount(accountData);
      setAccountAdded(true);
    }
  }, [accountData]);

  console.log("characters", characters);

  const handleSubmitClick = () => {
    localStorage.setItem("apikey", JSON.stringify(textkey));
    setApikey(textkey);
    setSkip(false);
    setSnackbar({
      children: "API Key successfully saved",
      severity: "success",
    });
  };

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("handleDeleteClick");
    localStorage.removeItem("accountId");
    localStorage.removeItem("apikey");
    localStorage.removeItem("characters");
    setAccountAdded(false);
    setSnackbar({
      children: "API Key successfully deleted",
      severity: "success",
    });
    setOpen(false);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="API Key"
        subtitle="Here you can add your API key"
      />
      <Box m="1.5rem 2.5rem">
        You can create an API Key at{" "}
        <Link
          href="https://account.arena.net/applications"
          color={theme.palette.secondary[200]}
          target="_blank"
          rel="noreferrer"
        >
          https://account.arena.net/applications
        </Link>
        .
        <br />
        Make sure you select the characters permission.
      </Box>
      <Box>
        <TextField
          id="api-key-input"
          label="Api key"
          variant="outlined"
          defaultValue={
            apikey || JSON.parse(localStorage.getItem("apikey")) || ""
          }
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
        <Button
          variant="outlined"
          sx={{
            m: "0.5rem 0rem",
            color: theme.palette.secondary[100],
            backgroundColor: theme.palette.secondary[600],
          }}
          onClick={(e) => {
            handleDeleteClick();
          }}
        >
          Delete
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
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Deleting API Key</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your API Key?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
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

export default ApiKey;
