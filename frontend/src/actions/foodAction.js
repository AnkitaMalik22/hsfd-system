import axios from "axios";

import {
  ALL_FOOD_FAIL,
  ALL_FOOD_REQUEST,
  ALL_FOOD_SUCCESS,
  // ADMIN_FOOD_REQUEST,
  // ADMIN_FOOD_SUCCESS,
  // ADMIN_FOOD_FAIL,
  NEW_FOOD_REQUEST,
  NEW_FOOD_SUCCESS,
  NEW_FOOD_FAIL,
  UPDATE_FOOD_REQUEST,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAIL,
  DELETE_FOOD_REQUEST,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_FAIL,
  FOOD_DETAILS_SUCCESS,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  NEW_COMMENT_FAIL,
  ALL_COMMENT_REQUEST,
  ALL_COMMENT_SUCCESS,
  ALL_COMMENT_FAIL,
  ACCEPT_COMMENT_REQUEST,
  ACCEPT_COMMENT_SUCCESS,
  ACCEPT_COMMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/foodConstant";

// Get All FOODs
export const getFoods =
  () =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_FOOD_REQUEST });

      let link = `/api/v1/foods`;

    

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_FOOD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_FOOD_FAIL,
        payload: error.response.data.message,
      });
    }
  };



// Create FOOD
export const createFood = (FoodData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_FOOD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/hotel/food/new`,
      FoodData,
      config
    );

    dispatch({
      type: NEW_FOOD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_FOOD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update FOOD
export const updateFood = (id, FoodData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FOOD_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/food/${id}`,
      FoodData,
      config
    );

    dispatch({
      type: UPDATE_FOOD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FOOD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete FOOD
export const deleteFood = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FOOD_REQUEST });

    const { data } = await axios.delete( `/api/v1/food/${id}`);

    dispatch({
      type: DELETE_FOOD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FOOD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get FOODs Details
export const getFoodDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FOOD_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/food/${id}`);
//     console.log('****************************');
// console.log(data);
// console.log('=************************');

    dispatch({
      type: FOOD_DETAILS_SUCCESS,
      payload: data.food,
    });
  } catch (error) {
    dispatch({
      type: FOOD_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW COMMENT
export const newFoodRequest = (commentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COMMENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/request`,commentData, config);

    dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload: error.response.data.message,
    });
   alert(error.response.data.message)
  }
};

// Get All COMMENTs of a FOOD
export const getAllRequests = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COMMENT_REQUEST });

    const { data } = await axios.get(`/api/v1/requests`);

    dispatch({
      type: ALL_COMMENT_SUCCESS,
      payload: data.requests,
    });
  } catch (error) {
    dispatch({
      type: ALL_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete COMMENT of a FOOD
export const acceptFoodRequest = (requestId,foodId) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_COMMENT_REQUEST });

    const { data } = await axios.put(
      `/api/v1/request/accept/${foodId}` , requestId
    );

    dispatch({
      type: ACCEPT_COMMENT_SUCCESS,
      payload: data.success,
    });
    console.log(data.success);
  } catch (error) {
    dispatch({
      type: ACCEPT_COMMENT_FAIL,
      payload: error.response.data.message,
    });

  } 
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
