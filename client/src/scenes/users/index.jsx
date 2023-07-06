import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";

import Header from "components/Header";
import DataGridRoles from "components/DataGridRoles";
import DataGridUsers from "components/DataGridUsers";

const Users = () => {
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
        title="Account Roles"
        subtitle="All account roles"
      />
      <DataGridRoles />
      <Header
        title="USERS"
        subtitle="All accounts that added an api key"
      />
      <DataGridUsers />
    </Box>
  );
};

export default Users;
