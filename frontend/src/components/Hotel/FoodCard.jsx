

import {Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import FoodDetails from './FoodDetails/FoodDetails';

const FoodCard = ({food}) => {



  return (
    <>

   <Box sx={{color:"black"}}>

   <h2>{food.name}</h2>
    <p>food # {food._id}</p>

{/* <img src={food.img.src} alt ="food Img"/> */}
    
   <span className="detailsBlock-2-span">
 
   Requests: {food.numOfRequests}
   <br/>
   {food.requests &&
food.requests.map((request) => (
   <div key={request._id}>
     <p >requested by :{request.name}</p>
     <p > message: {request.comment}</p>
   </div>
    ))
    }
  </span>
  
  <Link to={`/food/${food._id}`} >
  <Button variant="contained" color="primary" text-decoration="none">view food</Button>
  </Link>


   </Box>


    
    </>
  )
};

export default FoodCard