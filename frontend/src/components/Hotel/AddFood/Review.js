import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Photo } from "@mui/icons-material";


// const styles = theme => ({
//   listItem: {
//     padding: `${theme.spacing.unit}px 0`
//   },
//   total: {
//     fontWeight: "700"
//   },
//   title: {
//     marginTop: theme.spacing.unit * 2
//   }
// });

function Review(props) {
//   const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom style={{marginTop:"2rem",marginLeft:"2rem"}}>
        Food Details summary
      </Typography>
      <List style={{padding:" 0 2rem"}} >
       
          <ListItem >
            <ListItemText primary="Food Name" />
            <Typography variant="body2">Food Name</Typography>
            
          </ListItem>
          <ListItem >
         <Photo/>
        </ListItem>
       
      </List>
      <Grid container spacing={4} style={{padding:"2rem"}}>
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" gutterBottom >
           Added By
          </Typography>
          <Typography gutterBottom>Hotel Name</Typography>
          <Typography gutterBottom>Hotel Address</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom >
            Food Quantity
          </Typography>
          <Grid container>
        
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom>Food Category</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Food Quantity</Typography>
                </Grid>
              </React.Fragment>
        
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Review;
