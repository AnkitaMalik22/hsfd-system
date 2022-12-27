import React from 'react'
import Paperbase from '../MUI/Paperbase.js'
import Req from './Req.js'

const FoodRequests = ({user}) => {
  return (
    <>
   <Paperbase user={user} children={<Req user={user}/>}/> 
 
    </>
  )
}

export default FoodRequests