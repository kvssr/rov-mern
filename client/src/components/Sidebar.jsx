import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  CalendarMonth,
  KeyOutlined,
  InsightsOutlined,
  BarChartOutlined,
  TableChartOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile_anon.jpg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    power: 0,
  },
  {
    text: "Player Section",
    icon: null,
    power: 0,
  },
  {
    text: "API key",
    icon: <KeyOutlined />,
    power: 0,
  },
  {
    text: "Personal",
    icon: <InsightsOutlined />,
    power: 10,
  },
  {
    text: "Characters",
    icon: <Groups2Outlined />,
    power: 50,
  },
  {
    text: "Raid",
    icon: null,
    power: 0,
  },
  {
    text: "Details",
    icon: <BarChartOutlined />,
    power: 10,
  },
  {
    text: "Groups",
    icon: <TableChartOutlined />,
    power: 10,
  },
  {
    text: "Management",
    icon: null,
    power: 50,
  },
  {
    text: "Users",
    icon: <Groups2Outlined />,
    power: 50,
  },
  {
    text: "Logs",
    icon: <UploadFileOutlined />,
    power: 50,
  },
  {
    text: "Views",
    icon: <CalendarMonth />,
    power: 50,
  },
];

const Sidebar = ({
  account,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  console.log("Side bar account", account);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-Box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    STATSOL
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, power }) => {
                if (power > account.accountRole.power) return "";
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        m: "2.25rem 0 1rem 3rem",
                        color: theme.palette.secondary[300],
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem
                    key={text}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box
            // position="absolute"
            bottom="2rem"
          >
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 1rem 0 1.5rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {account.name}
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.7rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {account.accountRole?.name || "Guest"}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
