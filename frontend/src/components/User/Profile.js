import React, { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData.js";
import Loader from "../layouts/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store.js";
import { loadUser } from "../../actions/userActions.js";
import Paperbase from "../common/Paperbase.jsx";
import LoginSignUp from "./LoginSignUp.js";


const drawerWidth = 256;

const ProfileContent = ({user,loading}) => {
 
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user && user.name ? `${user.name}` : ''}'s Profile`} />
     
          <div className="profileContainer">
            <div>
              {/* <h1>My Profile</h1> */}
              <img src= { user && user.avatar ? (user.avatar.url ? `${user.avatar.url}` : '' ): ''} alt={ user && user.name ? user.name : ''} />
              <Link to="/update/profile">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{ user && user.name ? `${user.name}` : ''}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p> { user && user.email ? `${user.email}` : ''}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user && user.createdAt ? `${user.createdAt.substring(0, 10)}` : '')}</p>
              </div>

              <div>
                { user & user.role==='hotel' ? (<Link to="/requests">Requests</Link>) : (<Link to="/requests/my">My Requests</Link>)}
                
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
         
        </Fragment>
      )}
    </Fragment>
  );
};





const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);

  return (

    <>{user && user.role ? (user.role==='volunteer'? <Paperbase user={user} children={<ProfileContent user={user} loading={loading} />}/>  : <Paperbase user={user} children={<ProfileContent user={user} loading={loading} />}/> ) : (<LoginSignUp/>) }</>
  )
}

export default Profile
