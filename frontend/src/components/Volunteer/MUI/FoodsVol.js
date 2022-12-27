import React, { Fragment, useEffect, useState,useLayoutEffect } from "react";
import { Paper,Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getFoods,
} from "../../../actions/foodAction.js";
import Loader from "../../layouts/Loader/Loader.js";
import MetaData from "../../layouts/MetaData.js";

// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';

import  CardFood from "./Card";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions.js";



export default function FoodsVol() {

  const dispatch = useDispatch();
  // const alert = useAlert();
  const {
    foods,
    load,
    error,

  } = useSelector((state) => state.foods);
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);

  const [place ,setPlace] = useState({
  
    country:``,
    state:``,
    district:``,

})


 


  // useEffect(() => {
    // store.dispatch(loadUser());
    // if (error) {
      // alert.error(error);
      // alert(error);
      // dispatch(clearErrors());
    // }
    // handleSetPlace();
    
    // setPlace({
  
    //   country:`${user.country}`,
    //   state:`${user.state}`,
    //   district:`${user.district}`,
    
    // })

   
   

  useEffect(() => {
    store.dispatch(loadUser());
  
    console.log("loaded1")
    return () => {
     
      dispatch(getFoods(place))
      console.log("loaded2")
    }
  }, [dispatch])

  useLayoutEffect(() => {
    setPlace({
    
      country:`${user.country}`,
      state:`${user.state}`,
      district:`${user.district}`,
    
    }) 
  console.log("loaded3")
  }, [user])

//  async function handleSetPlace(){
//    await setPlace({
    
//       country:`${user.country}`,
//       state:`${user.state}`,
//       district:`${user.district}`,
    
//     }) 
//     await dispatch(getFoods(place))
//     } 


//  function loadFoods (){
 
// if(isAuthenticated){
//  setPlace({
    
//     country:`${user.country}`,
//     state:`${user.state}`,
//     district:`${user.district}`,
  
//   }) 
//   dispatch(getFoods(place))


// }


// }
// async function loadFoods(){

// await  setPlace({
    
//   country:`${user.country}`,
//   state:`${user.state}`,
//   district:`${user.district}`,

// }) 
// await dispatch(getFoods(place)) 

//   }



// await loadFoods()


// isAuthenticated ? setPlace({
  
//   country:`${user.country}`,
//   state:`${user.state}`,
//   district:`${user.district}`,

// }) :setPlace({
  
//   country:``,
//   state:``,
//   district:``,

// })


  // const [showAddFood,setShowAddFood] = React.useState(false);
  return (
    <Fragment>
      
    {load || loading ? (
      <Loader />
    ) : (
     <Fragment>
          <MetaData title={`FOODS`} />
    {/* <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}> */}
    <div className="foods">
{foods &&
 foods.map((food) => (
    <CardFood key={food._id} food={food}  maxWidth={906}  />
  ))}
</div>
      
  </Fragment>
)} 
<Paper sx={{ overflow: 'hidden',border:'1px solid #e3f2fd',padding:" 1rem  1rem 0 1rem" }}>
<Typography component="h2" variant="h6" color="primary" gutterBottom>
       No Foods! 
        </Typography>
</Paper>
</Fragment>
  )
}