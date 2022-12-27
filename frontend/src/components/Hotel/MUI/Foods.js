import { Paper,Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  totalFoodsOfHotel
  } from "../../../actions/foodAction.js";
import Loader from "../../layouts/Loader/Loader.js";
import MetaData from "../../layouts/MetaData.js";

// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';

import  CardFood from "../Card.js";



export default function Foods({user}) {

  const dispatch = useDispatch();
  // const alert = useAlert();
  const { totalFoods,loading} = useSelector((state) => state.totalFoods);
  useSelector((state) =>console.log( state.totalFoods));

React.useEffect(() => {
  // store.dispatch(loadUser())
user && dispatch(totalFoodsOfHotel(user._id))
   console.log(totalFoods)

  }, [dispatch]);


  // const [showAddFood,setShowAddFood] = React.useState(false);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
     <Fragment>
          <MetaData title={`FOODS`} />
    {/* <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}> */}
    <div className="foods">
{totalFoods &&
 totalFoods.map((food) => (
    <CardFood key={food._id} food={food}  maxWidth={906}  />
  ))}
</div>
      
  </Fragment>
)} 
<Paper sx={{ overflow: 'hidden',border:'1px solid #e3f2fd' ,marginBottom:"1rem" }}>
 <Typography variant="body2" color="text.secondary">
       No Foods!
        </Typography>
</Paper>
</Fragment>
  )
}