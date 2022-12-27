import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { acceptFoodRequest } from '../../actions/foodAction.js';
import { useDispatch } from "react-redux";


const FoodAcceptRequest = ({isAuthenticated,loading}) => {
  const dispatch = useDispatch();
const requestId=useParams("requestId");
const foodId=useParams("foodId");
  const [status, setStatus] = React.useState(false)
 React.useEffect(() => {

   if( !loading && isAuthenticated){
  dispatch( acceptFoodRequest({requestId : requestId.requestId},foodId.foodId))
    setStatus(true)
   }
// console.log('====================================');
// console.log({requestId : requestId.requestId},foodId.foodId);
// console.log('====================================');
// else{
//     alert("already accepted")
//    }

    
 }, [])
 
  return (
    <div>{status? "SucessFully accepted !  " :"somethiing went wrong!"}<Link to={"/"}><p>go Home</p></Link> </div>
  )
}

export default FoodAcceptRequest