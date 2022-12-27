import React from 'react'
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




const RequestFoods= ({user}) => {


    const dispatch = useDispatch();
    // const alert = useAlert();
    const {
      foods,
      loading,
      error,
  
    } = useSelector((state) => state.foods);
  
  
    React.useEffect(() => {
      if (error) {
        // alert.error(error);
        alert(error);
        dispatch(clearErrors());
      }
  
     dispatch(getFoods());
  
    }, [dispatch,error]);
  


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
   
<TableRow  >
 <TableCell  component="th" scope="row" >
  No Food!
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






export default RequestFoods;
