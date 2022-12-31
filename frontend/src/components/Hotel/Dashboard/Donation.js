import React, { useEffect } from "react";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useSelector, useDispatch } from "react-redux";
import {
totalFoodsOfHotel
} from "../../../actions/foodAction.js";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";

function preventDefault(event) {
  event.preventDefault();
}

export default function Donation() {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
 
  const {
   totalFoods
    
      } = useSelector((state) => state.totalFoods);

      useEffect(() => {
        store.dispatch(loadUser())
       
      }, []);

    useEffect(() => {
        // store.dispatch(loadUser())
   if(user && user._id){
    dispatch(totalFoodsOfHotel(user._id))
   }
         console.log(totalFoods)
      
        }, [dispatch]);
      

  return (
    <React.Fragment>
      <Title>Total Donations</Title>
      <Typography component="p" variant="h4">
      {totalFoods && totalFoods.length ? totalFoods.length : 0 }
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on This Year
      </Typography>
      <div>
        <Link color="primary" href="/foods" onClick={preventDefault}>
          View Foods
        </Link>
      </div>
    </React.Fragment>
  );
}