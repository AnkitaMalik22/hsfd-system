import React, { useEffect } from "react";
import VolHome from '../MUI/VolHome.js'
import Dashboard from './Dashboard.jsx'
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";
import MetaData from "../../layouts/MetaData.js";
// "react": "^18.2.0",


const DashboardMainVol = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);

  return (
  <>  <MetaData title={`Dashboard`} /> <VolHome user={user} children={<Dashboard />} /> </>
  )
}

export default DashboardMainVol