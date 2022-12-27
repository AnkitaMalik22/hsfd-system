import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { HotelOutlined, LocalActivityOutlined, PhotoAlbumOutlined, VolunteerActivismOutlined } from '@mui/icons-material';
import { useSelector ,useDispatch} from 'react-redux';
import store from '../store.js';
import { logout } from '../actions/userActions.js';
import { Logout } from "@mui/icons-material";



export default function NavBar({isAuthenticated}) {
  const dispatch = useDispatch();
  // const { isAuthenticated} = useSelector((state) => state.user);

  const [state, setState] = React.useState({
    top: false,
  
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Blogs', 'Hotels', 'Volunteer', 'Organizers'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <HotelOutlined />: 
                <VolunteerActivismOutlined/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[ 'Photos', 'Location'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index  === 1 ? <LocalActivityOutlined /> : <PhotoAlbumOutlined />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

<React.Fragment key={'left'}>
<MenuIcon onClick={toggleDrawer('left', true)} />
          <Drawer
            left={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
        
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel Surplus Food Distribution
          </Typography>
   
          { isAuthenticated ? <Button color="inherit" onClick={()=>{ dispatch(logout())}}><Logout/>Logout</Button> : <Button color="inherit"><Link to={"login"}>Login</Link></Button>}
        </Toolbar>
      </AppBar>




      {/* // {['left'].map((left) => ( */}
      
      {/* // ))} */}
   


    </Box>
  );
}
