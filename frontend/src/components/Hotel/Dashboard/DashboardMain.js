import React, { Fragment, useEffect, useState } from "react";
import Paperbase from '../MUI/Paperbase.js'
import Dashboard from './Dashboard.jsx'



const DashboardMain = ({user}) => {


  return (
  <>  {user.role === "hotel" &&  <Paperbase user={user} children={<Dashboard user={user}/>} />}</>
  )
}

export default DashboardMain