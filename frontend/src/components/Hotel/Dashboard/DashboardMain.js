import React, { Fragment, useEffect, useState } from "react";
import Paperbase from '../MUI/Paperbase.js'
import Dashboard from './Dashboard.jsx'
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";
import MetaData from "../../layouts/MetaData.js";


const DashboardMain = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);


  return (
  <>  <MetaData title={`Dashboard`} /> <Paperbase user={user} children={<Dashboard user={user}/>} /></>
  )
}

export default DashboardMain