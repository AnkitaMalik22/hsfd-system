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
    NEW_FOOD_RESET,
    UPDATE_FOOD_REQUEST,
    UPDATE_FOOD_SUCCESS,
    UPDATE_FOOD_FAIL,
    UPDATE_FOOD_RESET,
    DELETE_FOOD_REQUEST,
    DELETE_FOOD_SUCCESS,
    DELETE_FOOD_FAIL,
    DELETE_FOOD_RESET,
    FOOD_DETAILS_REQUEST,
    FOOD_DETAILS_FAIL,
    FOOD_DETAILS_SUCCESS,
    NEW_COMMENT_REQUEST,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_FAIL,
    NEW_COMMENT_RESET,
    ALL_COMMENT_REQUEST,
    ALL_COMMENT_SUCCESS,
    ALL_COMMENT_FAIL,
    ACCEPT_COMMENT_REQUEST,
    ACCEPT_COMMENT_SUCCESS,
    ACCEPT_COMMENT_FAIL,
    ACCEPT_COMMENT_RESET,
    CLEAR_ERRORS,
  } from "../constants/foodConstant";
  
  export const foodsReducer = (state = { foods: [] }, action) => {
    switch (action.type) {
      case ALL_FOOD_REQUEST:
        return {
          loading: true,
          foods: [],
        };
      case ALL_FOOD_SUCCESS:
        return {
          loading: false,
          foods: action.payload.foods,
          foodsCount: action.payload.foodsCount,
          resultPerPage: action.payload.resultPerPage,
         
        };
  
    
      case ALL_FOOD_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newFoodReducer = (state = { food: {} }, action) => {
    switch (action.type) {
      case NEW_FOOD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_FOOD_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          food: action.payload.food,
        };
      case NEW_FOOD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_FOOD_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const foodReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_FOOD_REQUEST:
      case UPDATE_FOOD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_FOOD_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_FOOD_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_FOOD_FAIL:
      case UPDATE_FOOD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_FOOD_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_FOOD_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const foodDetailsReducer = (state = { food: {} }, action) => {
    switch (action.type) {
      case FOOD_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case FOOD_DETAILS_SUCCESS:
        return {
          loading: false,
          food: action.payload,
        };
      case FOOD_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newFoodRequestReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_COMMENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_COMMENT_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_COMMENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_COMMENT_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const allFoodRequestsReducer = (state = { COMMENTs: [] }, action) => {
    switch (action.type) {
      case ALL_COMMENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_COMMENT_SUCCESS:
        return {
          loading: false,
          COMMENTs: action.payload,
        };
      case ALL_COMMENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const acceptFoodRequestReducer = (state = {}, action) => {
    switch (action.type) {
      case ACCEPT_COMMENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ACCEPT_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case ACCEPT_COMMENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case ACCEPT_COMMENT_RESET:
        return {
          ...state,
          isAccepted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  