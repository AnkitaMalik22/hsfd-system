import React, { useEffect } from "react";
import Foods from './MUI/Foods'
import Paperbase from './MUI/Paperbase'
import { useSelector, useDispatch } from "react-redux";
import store from "../../store.js";
import { loadUser } from "../../actions/userActions";

const ShowAllFood = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);
  return (

        <Paperbase user={user} children={<Foods user={user}/>}/>
  )
}

export default ShowAllFood
