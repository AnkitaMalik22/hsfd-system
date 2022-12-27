import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
// import RefreshIcon from '@mui/icons-material/Refresh';
import { ClearAll } from '@mui/icons-material';
// import Checkout from '../AddFood/Checkout';
import AddDescription from '../AddFood/AddDesription.js';
// import Foods from './Foods.js';
import { CssBaseline } from '@mui/material';

export default function AddFood({user}) {
  React.useEffect(() => {
    // let str=window.location.pathname
    if( window.location.pathname ==='/food/:id'){
      console.log(  window.location.pathname);
    }
  
  }, [])
  
  const [showAddFood,setShowAddFood] = React.useState(false);
  return (
    <React.Fragment>
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden'  }} className="Add FOOD">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Add new food , share food details"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}
      
              onClick={()=>{showAddFood ? setShowAddFood(false) : setShowAddFood(true)}}
              >
               {showAddFood ? "Back" : "Add Food"}
              </Button>
              <Tooltip title="Clear Form">
                <IconButton>
                  <ClearAll color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

    {showAddFood ? <AddDescription /> : "" }
    <CssBaseline />

   
      {/* <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        No users for this project yet
      </Typography> */}
    </Paper>
    <br/>
    <br/>
  
    </React.Fragment>
  );
}