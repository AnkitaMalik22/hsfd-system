import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

const FoodList = ({food}) => {

   const navigate= useNavigate();
  return (

    <>
        <TableRow  key={food._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/volunteer/food/${food._id}`)}>
          <TableCell  component="th" scope="row" >
            {food.name}
          </TableCell>
    
          <TableCell align="right">{food.owner}</TableCell>
       

        </TableRow>
    


    
    </>


  )
}

export default FoodList