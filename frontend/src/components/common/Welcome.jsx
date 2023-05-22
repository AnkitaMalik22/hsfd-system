import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store.js";
import { loadUser } from "../../actions/userActions.js";
import "./Welcome.css";
import Paperbase from "./Paperbase.jsx";
import MetaData from "../layouts/MetaData.js";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <MetaData title={`Home`} />
      {
        isAuthenticated ?  
        <Paperbase
          user={user}
          children={
            <div className={`hero`}>
              <div className="overlay"></div>
              <div className="content">
                <h1>HOTEL SURPLUS FOOD DISTRIBUTION</h1>
                <p>
                  Reducing food waste, feeding the hungry, and building community.
                </p>
              {
                user && user.role === 'hotel' ?   <button className="login-welcome" onClick={()=>navigate("/add/food") }> Start Adding Food! </button> :  <button className="login-welcome" onClick={()=>navigate("/volunteer/foods")}> Start Requesting Food! </button>
              }
              </div>
            </div>  
          }
            />
            :

          <div className={`full-view hero`}>
            <div className="overlay"></div>
            <div className="content">
              <h1>HOTEL SURPLUS FOOD DISTRIBUTION</h1>
              <p>
                Reducing food waste, feeding the hungry, and building community.
              </p>
            
                 <button className="login-welcome" onClick={()=>navigate("/login")}> Login To Access
              </button> 
           
              
            </div>
          </div>
          
      }
     
</>
     
 
  );
};

export default Welcome;
