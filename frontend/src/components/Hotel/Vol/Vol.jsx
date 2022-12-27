import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Title from '../Dashboard/Title.js';
import { getAllVols } from "../../../actions/userActions.js";
import Paperbase from "../MUI/Paperbase.js";
import { ListItem, Paper } from "@mui/material";



// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default function Vols({user}) {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const {
 volunteers,
    loading,

  } = useSelector((state) => state.volunteers);


  useEffect(() => {

   dispatch(getAllVols());
   console.log(volunteers)

  }, [dispatch]);


  return (
   <>
   <Paperbase user={user} children={ <React.Fragment>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Registered Volunteers</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            {/* <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          { volunteers && volunteers.map(( volunteer) => (


            <TableRow key={ volunteer.name}>


              <TableCell>
             <ListItem sx={{  width: '100%',
    maxWidth: 360,}}>
             <ListItemAvatar>
              <Avatar
                alt={`Avatar `}
                src={volunteer.avatar.url ? volunteer.avatar.url : ""}
              />
            </ListItemAvatar>
            <ListItemText id={volunteer._id} primary={`${volunteer.name}`} />
             </ListItem>
              </TableCell>
              <TableCell align="right">{volunteer.email}</TableCell>
              {/* <TableCell>{row.name}</TableCell>
            
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
       see more volunteers
      </Link>
      </Paper>
    </React.Fragment> } />
   </>
  );
}