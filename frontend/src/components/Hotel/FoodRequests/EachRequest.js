import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { getFoodDetails } from '../../../actions/foodAction.js';
// import CardFood from '../Card';
import Paperbase from '../MUI/Paperbase.js'
import { useSelector, useDispatch } from "react-redux";
import Food from './Food.js';
import store from "../../../store.js";
import { loadUser ,clearErrors } from "../../../actions/userActions";
import { useSnackbar } from 'notistack';
import MetaData from "../../layouts/MetaData.js";


const EachRequest = () => {

  const dispatch = useDispatch();
const {isAuthenticated, user,loading} = useSelector((state) => state.user);

const{food,error}=useSelector((state)=>state.foodDetails)
    const id = useParams();
    const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (type,message) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };



 useEffect(() => {
    store.dispatch(loadUser())
   
  }, []);

  useEffect(() => {
    if (error) {
      showSnackbar("error",error)
      dispatch(clearErrors());
    }
  }, [error]);

  useEffect(() => {
    if (food) {
      dispatch(getFoodDetails(id.id));
    }
  }, [dispatch, food]);
    
  return (
<>
<MetaData title={`Food`} />
<Paperbase user={user} children={<Food food={food} />} />

</>
  )
  }

export default EachRequest;