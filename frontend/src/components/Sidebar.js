import {
    AccountBox,
    Add,
    Dashboard,
    FoodBankOutlined,
    Home,
    Hotel,
    ModeNight,
    RequestPageOutlined,
    RequestPageRounded,
  } from "@mui/icons-material";
  import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
  } from "@mui/material";
  import React from "react";
import AddFood from "./Hotel/AddFood/AddFood.js";
import AllFoods from "./Hotel/AllFoods";
import Requests from "./Hotel/Requests";
  
  const Sidebar = ({mode,setMode}) => {
    return (
      <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }} >
        <Box position="fixed">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/foods">
                <ListItemIcon>
                <FoodBankOutlined/>
                </ListItemIcon>
                <ListItemText primary="Foods" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/requests">
                <ListItemIcon>
                <RequestPageRounded/>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton  href="/AddFood">
                <ListItemIcon>
                <Add/>
                </ListItemIcon>
                <ListItemText primary="Add Food" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/Dashboard">
                <ListItemIcon>
                <Dashboard/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
   
            <ListItem disablePadding>
              <ListItemButton component="a" href="/profile">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;