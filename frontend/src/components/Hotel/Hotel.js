
import React from 'react'
import Paperbase from './MUI/Paperbase.js'
import Welcome from './Welcome.jsx'


const Hotel = ({isAuthenticated,user}) => {


  return (

    <React.Fragment>
    
   
<Paperbase user={user} children={null}/>
  

    </React.Fragment>
  )
}

export default Hotel