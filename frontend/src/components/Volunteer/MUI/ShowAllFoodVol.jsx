import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FoodsVol from './FoodsVol.js'
import VolHome from "../../common/Paperbase.jsx";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";

const ShowAllFoodVol = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);
  return (
<>
<VolHome user={user} children={<FoodsVol />}/>
</>
      
  )
}

export default ShowAllFoodVol
