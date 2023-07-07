import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Raids from "scenes/raids";
import Characters from "scenes/characters";
import Logs from "scenes/logs";
import ApiKey from "scenes/apikey";
import Personal from "scenes/personal";
import Users from "scenes/users";
import Groups from "scenes/groups";
import { useGetAccountQuery } from "state/api";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const accountLocal = localStorage.getItem("accountId")
    ? JSON.parse(localStorage.getItem("accountId"))
    : undefined;
  console.log("accountLocal", accountLocal);
  const { data: account, isLoading } = useGetAccountQuery(accountLocal || -1);
  console.log("account", account);
  const [accountAdded, setAccountAdded] = useState(false);
  if (isLoading) return "isLoading...";
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout account={account} />}>
              {" "}
              {!account && (
                <Route
                  path="/*"
                  element={
                    <Navigate
                      to="/api key"
                      replace
                    />
                  }
                />
              )}{" "}
              {account && [
                <Route
                  key="root"
                  path="/"
                  element={
                    <Navigate
                      to="/dashboard"
                      replace
                    />
                  }
                />,
                <Route
                  key="dashboard"
                  path="/dashboard"
                  element={<Dashboard />}
                />,
                <Route
                  key="details"
                  path="/details"
                  element={<Raids />}
                />,

                <Route
                  key="personal"
                  path="/personal"
                  element={<Personal />}
                />,

                <Route
                  key="groups"
                  path="/groups"
                  element={<Groups />}
                />,
              ]}{" "}
              {account.accountRole.power >= 50 && [
                <Route
                  key="logs"
                  path="/logs"
                  element={<Logs />}
                />,
                <Route
                  key="users"
                  path="/users"
                  element={<Users />}
                />,
                <Route
                  key="characters"
                  path="/characters"
                  element={<Characters />}
                />,
              ]}{" "}
              <Route
                path="/api key"
                element={<ApiKey setAccountAdded={setAccountAdded} />}
              />{" "}
              ,{" "}
            </Route>{" "}
          </Routes>{" "}
        </ThemeProvider>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
