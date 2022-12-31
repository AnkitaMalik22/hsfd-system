import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Donation from '././Donation.js'
// import Orders from './Orders.js';
import Req from '../FoodRequests/Req.js';
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";
import { useSnackbar } from 'notistack';


let mdTheme = createTheme({
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
// const mdTheme = createTheme();

export default function Dashboard() {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
 
  // const { enqueueSnackbar } = useSnackbar();
  // const showSnackbar = (message) => {
  //   enqueueSnackbar(message, {
  //     variant:'error',
  //   });
  // };

 
 
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);
  // React.useLayoutEffect(() => {
  //   if(!isAuthenticated){
  //     showSnackbar("Authentication needed to access this page!")
  //   }
   
  // }, [isAuthenticated]);

  return (
 <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
       
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
           
            overflow: 'auto',
          }}
        >
          {/* <Toolbar /> */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart  />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Donation  />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
                  <Req  />
                {/* </Paper> */}
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}



