import React from 'react'
import { useParams } from 'react-router-dom'
import { getFoodDetails } from '../../../actions/foodAction.js';
// import CardFood from '../Card';
import VolHome from '../MUI/VolHome.js'
import { useSelector, useDispatch } from "react-redux";
import Food from './Food.js';
import '../../../store.js'



const EachFood = ({user}) => {

  const dispatch = useDispatch();
const{food}=useSelector((state)=>state.foodDetails)
    const id = useParams();
const [foodDesc,setFood]=React.useState({id:"",
  name : "foodDetails.food.name",
  quantity :"",
  description:"",
  category:"",
  requests:[],
  image:[{url:""}],
  picked:false,
  createdAt :"",
  owner :"",
  numOfRequests :0,})


  React.useEffect(() => {
       
  
   
     dispatch(getFoodDetails(id.id));
     console.log(food);
     food ? setFood(food) : setFood(foodDesc)    
      }, [dispatch]);
    
  return (
<>
<VolHome user={user} children={<Food food={food} />} />

</>
  )
  }

export default EachFood;