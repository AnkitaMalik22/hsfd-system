import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";
import {getFoodDetails,newFoodRequest} from '../../actions/foodAction'
import { useParams,Link} from 'react-router-dom'
import { Button } from "@mui/material";

import {  CommentBank } from "@mui/icons-material";

const FoodDetailsVol = ({userId}) => {

 const { id } = useParams();
//  const foodId=id;
  const dispatch = useDispatch();
const {
  food,
  loading,
  error,

} = useSelector((state) => state.foodDetails);
const [comment, setComment] = useState("")
const [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (error) {
      // alert.error(error);
             
      alert(error);
      // dispatch(clearErrors());
    }
    if(food.requests ){
      food.requests.forEach(user => {
       
        if(user.toString() === userId.toString()){
          console.log(user,userId)
          setClicked(true)
        }
      });
   
      
    }
   dispatch(getFoodDetails(id));
  //  console.log(food)

  }, [dispatch,error,userId]);

  const requestFood=()=>{
    setClicked(true)
    const myForm = new FormData();
    myForm.set("foodId", id);
    myForm.set("comment", comment);

    dispatch(newFoodRequest(myForm)) 
  
  // alert("commented")
  }




  return (
    <React.Fragment>
    <div>
      <h1>FoodDetails</h1>
    <p>{food.name}</p>   
    <p>{id}</p>
   <hr />
    <div className="addComment">
                  <CommentBank/>
                  <input
                    type="text"
                    placeholder="comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                {/* */}
                
               
 <Button onClick={()=>{requestFood() }}  disabled={clicked}  >{!clicked ? "Request it" :"requested"}</Button>
    </div>
    </React.Fragment>
  )
}

export default FoodDetailsVol