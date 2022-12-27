import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function AddQuantity() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom style={{marginTop:"2rem",marginLeft:"2rem"}}>
       Food Quantity
      </Typography>
      <Grid container spacing={3} style={{padding:"2rem"}}>
        <Grid item xs={6} md={6}>
          <TextField required id="foodCategory" label="Category Of Food" fullWidth />
        </Grid>
      
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="quantity"
            label="Quantity"
            helperText="write in Kilograms"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveCard" value="yes" />}
            label="Checkout this"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddQuantity;
