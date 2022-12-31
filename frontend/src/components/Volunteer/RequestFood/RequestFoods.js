import React, { Fragment, useEffect, useState,useLayoutEffect } from "react";

import {
    clearErrors,
    getFoods,
    newFoodRequest,
  } from "../../../actions/foodAction";
import { useSelector, useDispatch } from "react-redux";
import FoodList from './FoodList.jsx';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Paper } from "@mui/material";
import Loader from '../../layouts/Loader/Loader';
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions.js";
import { useSnackbar } from 'notistack';


const RequestFoods= () => {


  const dispatch = useDispatch();
  const {
    foods,
    load,
    error,

  } = useSelector((state) => state.foods);
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);

  const [place ,setPlace] = useState({
  
    country:``,
    state:``,
    district:``,

})
const { enqueueSnackbar } = useSnackbar();

const showSnackbar = (type,message) => {
  enqueueSnackbar(message, {
    variant: type,
  });
};
  
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);
  useEffect(() => {
    if (error) {
      showSnackbar("error",error)
      dispatch(clearErrors());
    }
  },[error])

  useLayoutEffect(() => {
    setPlace({
      country: user && user.country ? `${user.country}` : '',
      state: user && user.state ? `${user.state}` : '',
      district: user && user.district ? `${user.district}` : '',
    });

  }, [isAuthenticated])
  
  
  useEffect(() => {
    dispatch(getFoods(place));
  }, [place,dispatch]);

  


  return (

     <>
 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
       <Table sx={{minWidth: 700}}>
    <TableHead>
      <TableRow>
        <TableCell >Foods</TableCell>
        
        <TableCell align="right"> Added by</TableCell>
       

      </TableRow>
    </TableHead>
 {  loading ? <TableBody><Loader/></TableBody> :  
    <TableBody>
{foods &&
    foods.map((food) => (


<FoodList key={food._id} food={food} /> 
 

  )) 
 }  
   
   {

foods && foods.length == 0 && <TableRow >
<TableCell  component="th" scope="row" >
 No requests!
</TableCell>
<TableCell align="right"></TableCell>
</TableRow>
}

   </TableBody> 
     }
  </Table>
  </Paper>

     
     </>

  )
}






export default RequestFoods;
