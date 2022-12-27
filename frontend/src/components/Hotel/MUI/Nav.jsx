import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
// import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
// import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
// import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { BrowseGallery, Dashboard, History,Share,LocationCity } from '@mui/icons-material';
import { useState } from 'react';
const categories = [
 
    {
      
      id: 'Home',
      children: [
        {  id: 'Home', icon: <PeopleIcon />, page: 'home' },
      {  id: 'Volunteers', icon: <PeopleIcon />, page: 'volunteers' },
      { id: 'Dashboard', icon: <Dashboard /> ,page: 'dashboard'},
      { id: 'Foods', icon: <Dashboard /> ,page: 'foods'},
      {id:'Add Food' , icon:<Dashboard/>,page:'add/food'},
      {id:'Requests' , icon:<Dashboard/>,page:'requests'}
    ],
    }
    
 
];

// const categories = [
//   {
//     id: 'Hotel',
//     children: [
//       {
//         id: 'Volunteers',
//         icon: <PeopleIcon />,
//         active: true,
//       },
//       { id: 'Dashboard', icon: <Dashboard /> },
//       { id: 'History', icon: <History /> },
//       { id: 'Gallery', icon: <BrowseGallery /> },
//       { id: 'Settings', icon: <SettingsEthernetIcon /> },
//       {
//         id: 'Blogs',
//         icon: <Share />,
//       },
//       {
//         id: 'Loaction',
//         icon: <LocationCity />,
//       },
//     ],
//   },
//   {
//     id: 'Guidelines',
//     children: [
//       { id: 'Quality', icon: <SettingsIcon /> },
//       { id: 'Performance', icon: <TimerIcon /> },
//       { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
//     ],
//   },
// ];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Nav(props) {

  const [active, setActive] = useState({status:false,id:"Volunteers"})
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          HSFD System
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
       

        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}
         >
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon ,page = null }) => {
              
             return page ? (
            <Link  to={`/${page}`} style={{textDecoration:"none"}}>
              <ListItem disablePadding key={childId} onClick={()=>setActive({status:true,id:childId})} >
              <ListItemButton selected={childId === active.id ? active.status : false} sx={item}>
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