import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useSelector, useDispatch } from "react-redux";
import {
totalFoodsOfHotel
} from "../../../actions/foodAction.js";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({user}) {
  const dispatch = useDispatch();
  
  const {
   totalFoods
    
      } = useSelector((state) => state.totalFoods);
      React.useEffect(() => {
        // store.dispatch(loadUser())
      dispatch(totalFoodsOfHotel(user._id))
         console.log(totalFoods)
      
        }, [dispatch]);
      

  return (
    <React.Fragment>
      <Title>Total Donations</Title>
      <Typography component="p" variant="h4">
      {totalFoods && totalFoods.length}
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