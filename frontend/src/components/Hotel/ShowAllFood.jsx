import React from 'react'
import Foods from './MUI/Foods'
import Paperbase from './MUI/Paperbase'

const ShowAllFood = ({user}) => {
  return (

        <Paperbase user={user} children={<Foods user={user}/>}/>
  )
}

export default ShowAllFood
