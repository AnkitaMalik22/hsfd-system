import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getFoods,
  newFoodRequest,
} from "../../actions/foodAction";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";
import FoodCard from "./FoodCard";


const AllFoods = () => {
    const dispatch = useDispatch();
    // const alert = useAlert();
    const {
      foods,
      loading,
      error,
  
    } = useSelector((state) => state.foods);
  
  
    useEffect(() => {
      if (error) {
        // alert.error(error);
        alert(error);
        dispatch(clearErrors());
      }
  
     dispatch(getFoods());
  
    }, [dispatch,error]);
  
    const requestFood=()=>{
  console.log("requesting food")
    }
  
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
     <Fragment>
          <MetaData title={`FOODS`} />
  <div className="w-screen h-screen flex flex-col items-center justify-center dark:bg-[#1F2937] border-2 border-blue-600 mr-0 md:mr-4 bg-slate-400  text-white ">
  <h2 className="foodsHeading">Foods</h2>

<div className="foods">
{foods &&
 foods.map((food) => (
    <FoodCard key={food._id}food={food} />
  ))}
</div>

</div>
</Fragment>
)} 
</Fragment>
  )
}

export default AllFoods