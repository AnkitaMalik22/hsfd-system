import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Logout } from '@mui/icons-material';
// import AddFood from './AddFood';
import {logout } from "../../../actions/userActions.js";
import {useDispatch} from 'react-redux';

// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Profiles from '../../User/Profile/Profiles.js';
// import Welcome from '../Welcome';




const lightColor = 'rgba(255, 255, 255, 0.7)';

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
  
 function logoutUser() {
  dispatch(logout())
  alert("Logout Successfully");
}
  
  const { onDrawerToggle , user} = props;
  // console.log(user.avatar.url)
  const img =user.avatar.url ? user.avatar.url : "";
  const [value, setValue] = React.useState(0);

 
  
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
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
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: lightColor,
                  '&:hover': {
                    color: 'common.white',
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to docs
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts" wrapper="span">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              {/* <IconButton color="inherit" sx={{ p: 0.5 }}> */}
      

                {/* <Avatar  alt="My Avatar" /> */}
                <Profiles img={img} />
{/*            
              </IconButton> */}
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
              <Typography color="inherit" variant="h5" component="h1">
              Welcome! Hotel {user.name}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
                href='/logout'
                onClick={()=>{logoutUser()}}
              >
               Logout
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Logout">
                <IconButton color="inherit">
                <Logout/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
     
      {/* <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>

        <Tabs textColor="inherit" value={value} onChange={handleChange}  variant="fullWidth"
          aria-label="full width tabs example">
          <Tab label="Foods"  {...a11yProps(0)}  />
          <Tab label="Requests" {...a11yProps(0)} />
          <Tab label="Ordered" {...a11yProps(0)} />
          <Tab label="Picked"  {...a11yProps(0)} />
        </Tabs>

      </AppBar> */}
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Welcome/>
      
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item Four
        </TabPanel>
      </SwipeableViews> */}
  
         
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;