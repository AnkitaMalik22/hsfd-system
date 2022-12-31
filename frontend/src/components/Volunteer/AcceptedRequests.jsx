import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Paper } from "@mui/material";
import Loader from '../layouts/Loader/Loader';
import store from "../../store.js";
import { loadUser } from "../../actions/userActions";
import { totalAcceptOfVol } from "../../actions/foodAction.js";
import { useNavigate } from "react-router-dom";
import VolHome from "./MUI/VolHome.js";
import { useSnackbar } from 'notistack';
import MetaData from "../layouts/MetaData";

const RequestList=({requests,foodId})=>{
  const navigate =useNavigate()
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


const AcceptedRequests= () => {
  const dispatch = useDispatch();

  // const alert = useAlert();
  const {isAuthenticated, user} = useSelector((state) => state.user);
  const {
    acceptedFoods,
    loading,
    error,

  } = useSelector((state) => state.acceptedFoods);
  

  const [count, setCount] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type,message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };



useEffect(() => {

  if (user && user._id) {
    dispatch(totalAcceptOfVol(user._id))
  
  }

  }, [dispatch, user]);
  useEffect(() => {
    if (error) {
      showSnackbar("error",error)
    }
  },[error])

  useEffect(() => {
    store.dispatch(loadUser());

  }, []);
  


  return (

     <>
        <MetaData title="Accepted Requests" />
 <VolHome user={user} children={<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
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
  acceptedFoods && acceptedFoods.totalAcceptedFoods && acceptedFoods.totalAcceptedFoods.map((food) => (

<RequestList requests={food.requests} key={food._id} foodId={food._id} /> 

  )) 
 }  
   
   {

acceptedFoods && acceptedFoods.totalAcceptedFoods && acceptedFoods.totalAcceptedFoods.length == 0 && <TableRow sx={{display:count ? "none" : "static"}} >
<TableCell  component="th" scope="row" >
 No requests!
</TableCell>
<TableCell align="right"></TableCell>
</TableRow>
}


   </TableBody> 
     }
  </Table>
  </Paper>} />

     
     </>

  )
}

export default AcceptedRequests
