import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title.js';
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
    acceptedFoods,
    loading,
    error,

  } = useSelector((state) => state.acceptedFoods);
  // const { totalAcceptedFoods}=acceptedFoods;
      

  return (
    <React.Fragment>
      <Title>Total Acceptance</Title>
      <Typography component="p" variant="h4">
      { acceptedFoods && acceptedFoods.totalAcceptedFoods && acceptedFoods.totalAcceptedFoods.length}
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