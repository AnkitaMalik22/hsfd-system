import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { markFoodPicked } from '../../actions/foodAction';
import { useDispatch } from "react-redux";
import { FOOD_PICKED_SUCCESS } from '../../constants/foodConstant';


const MarkFoodPicked = ({isAuthenticated,loading}) => {
    
  const dispatch = useDispatch();
const foodId=useParams("foodId");
  const [status, setStatus] = React.useState(false)
 React.useEffect(() => {

   if( !loading && isAuthenticated){
  dispatch( markFoodPicked(foodId.foodId))
  setStatus(true)
  
   }
//   React.useEffect(() => {

//     if(FOOD_PICKED_SUCCESS){
//         setStatus(true)
//        }
//   }, [FOOD_PICKED_SUCCESS])
  
// console.log('====================================');
// console.log({requestId : requestId.requestId},foodId.foodId);
// console.log('====================================');
// else{
//     alert("already accepted")
//    }

    
 }, [])
 
  return (
    <div>{status? "Food Marked as Picked !  " :"somethiing went wrong!"}<Link to={"/"}><p>go Home</p></Link> </div>
  )
}

export default  MarkFoodPicked;