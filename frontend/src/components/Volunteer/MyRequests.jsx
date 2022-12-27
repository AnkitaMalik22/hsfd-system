import React from 'react'
import {
    totalFoodRequestOfVol
  } from "../../actions/foodAction.js";
import { useSelector, useDispatch } from "react-redux";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Paper } from "@mui/material";
import Loader from '../../layouts/Loader/Loader.js';


const MyRequests= ({user}) => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const { totalFoods,loading} = useSelector((state) => state.totalRequestsVol);
  const [count, setCount] = React.useState(false)


React.useEffect(() => {
  // store.dispatch(loadUser())
user && dispatch(totalFoodRequestOfVol(user._id))
   console.log(totalFoods)

  }, [dispatch]);



  return (

     <>
 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
       <Table sx={{minWidth: 700}}>
    <TableHead>
      <TableRow>
        <TableCell > My Requests</TableCell>
        
        <TableCell align="right">status</TableCell>
       

      </TableRow>
    </TableHead>
 {  loading ? <TableBody><Loader/></TableBody> :  
    <TableBody>
{/* {
totalFoods &&
 totalFoods.map((food) => (

    <TableRow  key={request._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`food/${foodId}`)}>
    <TableCell  component="th" scope="row" >
      {request.comment}
    </TableCell>

    <TableCell align="right">{request.name}</TableCell>
 

  </TableRow>

  )) 
 }   */}
   
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

export default MyRequests
