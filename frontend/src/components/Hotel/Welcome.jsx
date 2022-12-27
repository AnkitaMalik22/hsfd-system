import { Avatar, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import Title from './Dashboard/Title'
import './Welcome.css'
import Paperbase from './MUI/Paperbase'


const Index=()=>{
  return(
    <>
  <div className="hero">
  <div className="overlay"></div>
  <div className="content">
    <h1>WELCOME TO HSFD.</h1>
    <p>Hotel Surplus Food Distribution</p>
  </div>
</div>
    </>
  )
}

const Welcome = ({user,isAuthenticated}) => {
  return (
    <>
   { isAuthenticated && <Paperbase user={user} children={<Index/>}/>}
</>
)
}



export default Welcome