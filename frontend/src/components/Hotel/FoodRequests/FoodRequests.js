import React, { useEffect } from "react";
import Paperbase from '../MUI/Paperbase.js'
import Req from './Req.js'
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";
import MetaData from "../../layouts/MetaData.js";

const FoodRequests = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);
  return (
    <>
     <MetaData title={`Requests`} />
   <Paperbase user={user} children={<Req />}/> 
 
    </>
  )
}

export default FoodRequests