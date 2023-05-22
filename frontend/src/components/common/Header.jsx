import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { Logout } from "@mui/icons-material";
import { logout } from "../../actions/userActions.js";

import Profiles from "../User/Profile/Profiles.js";

const lightColor = "rgba(255, 255, 255, 0.7)";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Header(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  function logoutUser() {
  
    dispatch(logout())
    navigate("/logout") 
    // *************************************
    // *************************************
    alert("Logout Successfully");
  }

  const { onDrawerToggle, user } = props;

  const img = user && user.avatar.url ? user.avatar.url : "";

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            
            <Grid item>
              <Tooltip title="Alerts • No alerts" wrapper="span">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Profiles img={img} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1"  sx={{fontSize : { sm: "2rem", xs: "1rem" }}}>
              {user && user.role==='hotel' &&    ` Welcome! Hotel ${user && user.name}`}
              {user && user.role==='volunteer' && `Welcome! Volunteer ${user && user.name}`}

              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                href="/logout"
                onClick={() => {
                  logoutUser();
                }}
              >
                Logout
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Logout">
                <IconButton color="inherit">
                  <Logout />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
