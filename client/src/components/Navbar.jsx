import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile_anon.jpg";
// import BannerImage from "assets/Banner.jpg";
import {
  AppBar,
  IconButton,
  Box,
  Typography,
  Toolbar,
  useTheme,
} from "@mui/material";

const Navbar = ({ account, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        baxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          // backgroundImage: `url(${BannerImage})`,
          // backgroundPositionY: "590px",
          // backgroundPositionX: "center",
          // backgroundColor: "#00000085",
          // backgroundBlendMode: "overlay",
        }}
      >
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <FlexBetween>
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="32px"
              width="32px"
              borderRadius="50%"
              marginRight={0.5}
              sx={{ objectFit: "cover" }}
            />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {account?.name}
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize="0.75rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {account.accountRole?.name || "Guest"}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
