import React, { useEffect } from "react";
import RequestFoods from "./RequestFoods";
import VolHome from '../MUI/VolHome';
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store.js";
import { loadUser } from "../../../actions/userActions";
import MetaData from "../../layouts/MetaData";

const RequestFood = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user,loading} = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);
    return (
      <>
      <MetaData title="Request Foods" />
      <VolHome user={user} children={<RequestFoods  />} />
      </>
    )
  }

  export default RequestFood;