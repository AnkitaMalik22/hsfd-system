import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store.js";
import { loadUser } from "../../actions/userActions";
import './Welcome.css'
import Paperbase from './MUI/Paperbase'
import MetaData from "../layouts/MetaData.js";


const Welcome = () => {


  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);
  return(
    <>
    <MetaData title={`Home`} />
      <Paperbase user={user} children={<div className="hero">
  <div className="overlay"></div>
  <div className="content">
    <h1>HOTEL SURPLUS FOOD DISTRIBUTION</h1>
    <p>Reducing food waste, feeding the hungry, and building community.</p>
  </div>
</div>}/>
</>
)
}



export default Welcome