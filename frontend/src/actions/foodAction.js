import axios from "axios";
import {
  ALL_FOOD_FAIL,
  ALL_FOOD_REQUEST,
  ALL_FOOD_SUCCESS,
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
  FOOD_PICKED_REQUEST,
  FOOD_PICKED_RESET,
  FOOD_PICKED_FAIL,
  CLEAR_ERRORS,
  FOOD_PICKED_SUCCESS,
  FOODS_PER_MONTH_FAIL,
  FOODS_PER_MONTH_REQUEST,
  FOODS_PER_MONTH_SUCCESS,
  TOTAL_FOOD_SUCCESS,
  TOTAL_FOOD_FAIL,
  TOTAL_FOOD_REQUEST,
  TOTAL_ACCEPTED_REQUEST,
  TOTAL_ACCEPTED_SUCCESS,
  TOTAL_ACCEPTED_FAIL,
  TOTAL_FOOD_VOL_REQUEST,
  TOTAL_FOOD_VOL_SUCCESS,
  TOTAL_FOOD_VOL_FAIL,
} from "../constants/foodConstant";

// Get All FOODs
export const getFoods = (place) => async (dispatch) => {
  try {
    dispatch({ type: ALL_FOOD_REQUEST });

    let link = `/api/v1/foods`;

    console.log(place);

    const { data } = await axios.post(link, place);

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

    // console.log(FormData)
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

    const { data } = await axios.put(`/api/v1/food/${id}`, FoodData, config);

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

    const { data } = await axios.delete(`/api/v1/food/${id}`);

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

    // console.log(data);
    // console.log('=************************');

    dispatch({
      type: FOOD_DETAILS_SUCCESS,
      payload: data.food,
    });
    console.log(data.food);
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

    const { data } = await axios.put(`/api/v1/request`, commentData, config);

    dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload: error.response.data.message,
    });
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

// ACCEPT FOOD REQUEST

export const acceptFoodRequest = (requestId, foodId) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_COMMENT_REQUEST });

    const { data } = await axios.put(
      `/api/v1/request/accept/${foodId}`,
      requestId
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
    console.log(error.response.data.message);
  }
};

// MARK FOOD PICKED

export const markFoodPicked = (foodId) => async (dispatch) => {
  try {
    dispatch({ type: FOOD_PICKED_REQUEST });

    const { data } = await axios.put(`/api/v1/food/picked/${foodId}`);

    dispatch({
      type: FOOD_PICKED_SUCCESS,
      payload: data.success,
    });
    console.log(data.success);
  } catch (error) {
    dispatch({
      type: FOOD_PICKED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// MARK FOOD PICKED

export const foodsOfThisMonth = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FOODS_PER_MONTH_REQUEST });

    const { data } = await axios.post(`/api/v1/foods/month`, {
      userId: userId,
    });

    dispatch({
      type: FOODS_PER_MONTH_SUCCESS,
      payload: data.foodDetails,
    });
    // console.log(data.foodDetails,userId);
  } catch (error) {
    dispatch({
      type: FOODS_PER_MONTH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const totalFoodsOfHotel = (userId) => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_FOOD_REQUEST });

    const { data } = await axios.post(`/api/v1/foods/total`, {
      userId: userId,
    });

    dispatch({
      type: TOTAL_FOOD_SUCCESS,
      payload: data.totalFoods,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_FOOD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const totalFoodRequestOfVol = (userId) => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_FOOD_VOL_REQUEST });

    const { data } = await axios.post(`/api/v1/food/requests/vol`, {
      userId: userId,
    });

    dispatch({
      type: TOTAL_FOOD_VOL_SUCCESS,
      payload: data.totalFoods,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_FOOD_VOL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const totalAcceptOfVol = (userId) => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_ACCEPTED_REQUEST });

    const { data } = await axios.post(`/api/v1/foods/accepted`, {
      userId: userId,
    });

    dispatch({
      type: TOTAL_ACCEPTED_SUCCESS,
      payload: data.foodDetails,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_ACCEPTED_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
