import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../../layouts/Loader/Loader";
import MetaData from "../../layouts/MetaData";
import {getFoodDetails} from '../../../actions/foodAction'
import { foodReducer } from "../../../reducers/foodReducer";
import { useParams,Link} from 'react-router-dom'
import { Button } from "@mui/material";

const FoodDetails = () => {
 const { id } = useParams();
  const dispatch = useDispatch();
//   // const alert = useAlert();
const {
  food,
  loading,
  error,

} = useSelector((state) => state.foodDetails);


  useEffect(() => {
    if (error) {
      // alert.error(error);
      alert(error);
      // dispatch(clearErrors());
    }

   dispatch(getFoodDetails(id));
   console.log(food)

  }, [dispatch,error]);

  const requestFood=()=>{
console.log("requesting food")
  }




  return (
    <React.Fragment>
    <div>
      <h1>FoodDetails</h1>
    <p>{food.name}</p>
   <ul>
   {food.requests &&
food.requests.map((request) => (
   <li key={request._id}>
     <p >requested by :{request.name}</p>
     <p > message: {request.comment}</p>
     <Link to={`/request/accept/foodId=${id}/requestId=${request.user}`}><Button disabled={request.status  ? true : false }>{request.status ? "already requested" : "Accept it" }</Button></Link>
   </li>
    ))
    }
   </ul>
   
    </div>
    </React.Fragment>
  )
}

export default FoodDetails