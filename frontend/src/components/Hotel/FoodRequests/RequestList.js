
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';


const RequestList = ({requests,foodId}) => {

   const navigate= useNavigate();
  return (

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