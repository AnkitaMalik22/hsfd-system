import React from 'react'
import FoodsVol from './FoodsVol.js'
import VolHome from './VolHome.js'

const ShowAllFoodVol = ({user}) => {
  return (

        <VolHome user={user} children={<FoodsVol user={user}/>}/>
  )
}

export default ShowAllFoodVol
