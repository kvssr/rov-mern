import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
// import BgImage from "assets/bg_carbon.jpg";

function Layout({ account }) {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width="100%"
      height="100%"
      sx={
        {
          // backgroundImage: `url(${BgImage})`,
          // backgroundPositionY: "590px",
          // backgroundPositionX: "center",
          // backgroundColor: "#00000085",
          // backgroundBlendMode: "overlay",
        }
      }
    >
      <Sidebar
        account={account || ""}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box
        flexGrow={1}
        flexShrink={1}
      >
        <Navbar
          account={account || ""}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet
          sx={{
            backgroundColor: "yellow",
          }}
        />
      </Box>
    </Box>
  );
}

export default Layout;
