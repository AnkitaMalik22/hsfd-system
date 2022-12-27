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


const RequestList=({requests,foodId})=>{
    return(
      <>
      
      {requests && requests.map(request => (
            <TableRow  key={request._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`food/${foodId}`)}>
              <TableCell  component="th" scope="row" >
                {request.comment}
              </TableCell>
        
              <TableCell align="right">{request.status}</TableCell>
           
    
            </TableRow>
          ))  
        }
      
      </>
    )
}


const PickedRequests= ({user}) => {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const {
    acceptedFoods,
    loading,
    error,

  } = useSelector((state) => state.acceptedFoods);

  const [count, setCount] = React.useState(false)


React.useEffect(() => {
  // store.dispatch(loadUser())
user && dispatch(totalAcceptOfVol(user._id))
   console.log(totalFoods)

  }, [dispatch]);



  return (

     <>
 <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
       <Table sx={{minWidth: 700}}>
    <TableHead>
      <TableRow>
        <TableCell > My Requests</TableCell>
        
        <TableCell align="right">Accepted</TableCell>
       

      </TableRow>
    </TableHead>
 {  loading ? <TableBody><Loader/></TableBody> :  
    <TableBody>
{
  acceptedFoods && acceptedFoods.totalPickedFoods && acceptedFoods.totalPickedFoods.map((food) => (

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

export default PickedRequests
