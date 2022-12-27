import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';

const RequestList = ({requests,foodId}) => {
// console.log("requests : " + requests,foodI)
   const navigate= useNavigate();
  return (
    // <Table sx={{minWidth: 700}}>
    // <TableHead>
    //   <TableRow>
    //     <TableCell >Requests</TableCell>
        
    //     <TableCell align="right">requested by</TableCell>
       

    //   </TableRow>
    // </TableHead>
    <>
      {requests && requests.map(request => (
        <TableRow  key={request._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`food/${foodId}`)}>
          <TableCell  component="th" scope="row" >
            {request.comment}
          </TableCell>
    
          <TableCell align="right">{request.name}</TableCell>
       

        </TableRow>
      ))  
    }


    
    </>

    
  // </Table>
  )
}

export default RequestList