import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Title from '../../Hotel/Dashboard/Title.js';
import { getAllHotels } from "../../../actions/userActions.js";
import VolHome from "../MUI/VolHome";
import { ListItem, Paper } from "@mui/material";



function preventDefault(event) {
  event.preventDefault();
}

export default function Hotels({user}) {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const {
 hotels,
    loading,

  } = useSelector((state) => state.hotels);


  useEffect(() => {

   dispatch(getAllHotels());
   console.log(hotels)

  }, [dispatch]);


  return (
   <>
   <VolHome user={user} children={ <React.Fragment>
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Title>Registered hotels</Title>
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
          { hotels && hotels.map(( hotel) => (


            <TableRow key={ hotel._id}>


              <TableCell>
             <ListItem sx={{  width: '100%',
    maxWidth: 360,}}>
             <ListItemAvatar>
              <Avatar
                alt={`Avatar `}
                src={hotel.avatar.url ? hotel.avatar.url : ""}
              />
            </ListItemAvatar>
            <ListItemText id={hotel._id} primary={`${hotel.name}`} />
             </ListItem>
              </TableCell>
              <TableCell align="right">{hotel.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
       see more hotels
      </Link>
      </Paper>
    </React.Fragment> } />
   </>
  );
}