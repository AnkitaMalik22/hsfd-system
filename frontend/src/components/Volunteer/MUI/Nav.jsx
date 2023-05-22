import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import TimerIcon from "@mui/icons-material/Timer";
import {
  Dashboard,
  DoneAll,
  Done,
  Hotel,
  FoodBank,
  FoodBankOutlined,
} from "@mui/icons-material";
import { useState } from "react";
const categories = [
  {
    id: "Home",
    children: [
      { id: "Home", icon: <HomeIcon />, page: "home" },
      { id: "Hotels", icon: <Hotel />, page: "hotels" },
      { id: "Dashboard", icon: <Dashboard />, page: "volunteer/dashboard" },
      { id: "Foods", icon: <FoodBank />, page: "volunteer/foods" },
      { id: " Request Food", icon: <FoodBankOutlined />, page: "request" },
    ],
  },
  {
    id: "Inbox",
    children: [
      { id: "Requests", icon: <TimerIcon />, page: "requests/my" },
      { id: " Accepted Requests", icon: <Done />, page: "requests/accepted" },
      { id: "Picked Foods", icon: <DoneAll />, page: "foods/picked" },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Nav(props) {
  const [active, setActive] = useState({ status: false, id: "Volunteers" });
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <i className="fas fa-utensils"></i>{" "}
          <h3 style={{ marginLeft: "4px" }}>hsfd</h3>
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>

        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, page = null }) => {
              return page ? (
                <Link to={`/${page}`} style={{ textDecoration: "none" }}>
                  <ListItem
                    disablePadding
                    key={childId}
                    onClick={() => setActive({ status: true, id: childId })}
                  >
                    <ListItemButton
                      selected={childId === active.id ? active.status : false}
                      sx={item}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ) : (
                <div />
              );
            })}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
