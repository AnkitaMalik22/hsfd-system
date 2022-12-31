import React, { useEffect, useState } from "react";
import {
  totalFoodsOfHotel
  } from "../../../actions/foodAction.js";
  import { useSelector, useDispatch } from "react-redux";
  import store from "../../../store.js";
  import { loadUser,clearErrors } from "../../../actions/userActions";
import RequestList from './RequestList';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Paper } from "@mui/material";
import Loader from '../../layouts/Loader/Loader.js';
import { useSnackbar } from 'notistack';

const Req= () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state) => state.user);

  // const alert = useAlert();
  const { totalFoods,loading,error} = useSelector((state) => state.totalFoods);
  const [count, setCount] = React.useState(false)
  const [userId,setUserId]=useState('')
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type,message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);
 
  useEffect(() => {
    if (error) {
      showSnackbar("error",error)
      dispatch(clearErrors());
    }
  }, [error]);

  React.useLayoutEffect(() => {
    user && user._id ? setUserId(  `${user._id}` ) : setUserId('');

  }, [isAuthenticated])

  useEffect(() => {
    dispatch(totalFoodsOfHotel(userId));
  }, [dispatch, userId]);



  return (

     <>
 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
       <Table sx={{minWidth: 700}}>
    <TableHead>
      <TableRow>
        <TableCell >Requests</TableCell>
        
        <TableCell align="right">requested by</TableCell>
       

      </TableRow>
    </TableHead>
 {  loading ? <TableBody><Loader/></TableBody> :  
    <TableBody>
{
totalFoods &&
 totalFoods.map((food) => (


<RequestList requests={food.requests} key={food._id} foodId={food._id} /> 
 

  )) 
 }  
   
   {

totalFoods &&
 totalFoods.length == 0 && <TableRow  >
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

export default Req
