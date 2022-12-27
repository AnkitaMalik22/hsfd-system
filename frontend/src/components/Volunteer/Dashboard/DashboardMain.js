import React, { Fragment, useEffect, useState } from "react";
import VolHome from '../MUI/VolHome.js'
import Dashboard from './Dashboard.jsx'



const DashboardMainVol = ({user}) => {


  return (
  <>  {user.role === "volunteer" &&  <VolHome user={user} children={<Dashboard user={user}/>} />}</>
  )
}

export default DashboardMainVol