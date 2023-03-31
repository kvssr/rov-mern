import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Raids from "scenes/raids";
import Characters from "scenes/characters";
import Logs from "scenes/logs";
import ApiKey from "scenes/apikey";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />{" "}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />{" "}
              <Route
                path="/details"
                element={<Raids />}
              />{" "}
              <Route
                path="/characters"
                element={<Characters />}
              />{" "}
              <Route
                path="/logs"
                element={<Logs />}
              />{" "}
              <Route
                path="/api key"
                element={<ApiKey />}
              />{" "}
            </Route>{" "}
          </Routes>{" "}
        </ThemeProvider>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
