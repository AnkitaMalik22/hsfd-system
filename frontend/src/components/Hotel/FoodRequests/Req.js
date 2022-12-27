import React from 'react'
import {
  totalFoodsOfHotel
  } from "../../../actions/foodAction.js";
import { useSelector, useDispatch } from "react-redux";
import RequestList from './RequestList';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Paper } from "@mui/material";
import Loader from '../../layouts/Loader/Loader.js';


const Req= ({user}) => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const { totalFoods,loading} = useSelector((state) => state.totalFoods);
  const [count, setCount] = React.useState(false)


React.useEffect(() => {
  // store.dispatch(loadUser())
user && dispatch(totalFoodsOfHotel(user._id))
   

  }, [dispatch]);



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
   
   <TableRow sx={{display:count ? "none" : "static"}} >
 <TableCell  component="th" scope="row" >
  No requests!
 </TableCell>
 <TableCell align="right"></TableCell>
</TableRow>

   </TableBody> 
     }
  </Table>
  </Paper>

     
     </>

  )
}

export default Req
