import * as React from 'react';
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavHotel from '../Hotel/MUI/Nav';
import NavVol from '../Volunteer/MUI/Nav';
import Header from './Header';
import '../../store'
import Welcome from './Welcome';

let theme = createTheme({
  palette: {
    // primary: {
    //   light: '#63ccff',
    //   main: '#009be5',
    //   dark: '#006db3',
    // },
    primary:{
      light:'#F05A22',
      main:'#F05A22',
      dark:'#F05A22'
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;


export default function Paperbase({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
   <>
{children != null ? ( <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {user && (
          <>
            {user.role === 'hotel' ? (
              <NavHotel
                PaperProps={{ style: { width: drawerWidth } }}
                variant={isSmUp ? 'permanent' : 'temporary'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            ) : (
              <NavVol
                PaperProps={{ style: { width: drawerWidth } }}
                variant={isSmUp ? 'permanent' : 'temporary'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}
          </>
        )}
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {user &&  <Header onDrawerToggle={handleDrawerToggle} user={user} />}
        <Box sx={{ flexGrow: 1, padding: '1rem', backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]) }}>
            {children}
          </Box>
      </Box>
    </Box>
  </ThemeProvider>) : <Welcome/>
  }  
 </>
  );
}









