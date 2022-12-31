import React, { Fragment, useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser,clearErrors } from "../../../actions/userActions";
import { useSnackbar } from 'notistack';
import MetaData from "../../layouts/MetaData.js";


function preventDefault(event) {
  event.preventDefault();
}

export default function Vols() {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const {isAuthenticated, user} = useSelector((state) => state.user);
 
  const {
 volunteers,
    loading,
    error

  } = useSelector((state) => state.volunteers);
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type,message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };


  useEffect(() => {
    if (error) {
      showSnackbar("error",error)
      dispatch(clearErrors());
    }
   
  }, [error]);

  useEffect(() => {
    store.dispatch(loadUser())
   
  }, [error]);
  useEffect(() => {

   dispatch(getAllVols());
   console.log(volunteers)

  }, [dispatch]);


  return (
   <>
    <MetaData title={`Volunteers`} />
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