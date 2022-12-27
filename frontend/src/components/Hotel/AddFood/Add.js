import React from 'react'
import AddFood from './AddFood.js'
import Paperbase from '../MUI/Paperbase.js'

const Add = ({user}) => {
  return (
   <Paperbase  user={user} children={<AddFood user={user} />} />
  )
}

export default Add