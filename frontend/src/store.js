import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newFoodReducer,
  foodDetailsReducer,
  foodReducer,
  newFoodRequestReducer,
  foodsReducer,
  allFoodRequestsReducer,
  acceptFoodRequestReducer,
  markPickedFoodReducer,
  foodsOfThisMonthReducer,
  totalFoodsReducer,
  totalAcceptOfVolReducer,
  totalfoodRequestVolReducer
} from "./reducers/foodReducer";

import {
  allHotelsReducer,
  allUsersReducer,
  allVolunteersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";


// import { cartReducer } from "./reducers/cartReducer";
// import {
//   allOrdersReducer,
//   myOrdersReducer,
//   newOrderReducer,
//   orderDetailsReducer,
//   orderReducer,
// } from "./reducers/orderReducer";

const reducer = combineReducers({
  foods: foodsReducer,
  foodDetails: foodDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
//   cart: cartReducer,
//   newOrder: newOrderReducer,
//   myOrders: myOrdersReducer,
//   orderDetails: orderDetailsReducer,
 newFoodRequest:newFoodRequestReducer,
  newFood: newFoodReducer,
  food: foodReducer,
//   allOrders: allOrdersReducer,
//   order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
 foodRequests: allFoodRequestsReducer,
  acceptRequest: acceptFoodRequestReducer,
  foodPicked : markPickedFoodReducer,
  foodsPerMonth : foodsOfThisMonthReducer,
  totalFoods : totalFoodsReducer,
  acceptedFoods : totalAcceptOfVolReducer,
  hotels  : allHotelsReducer,
 volunteers: allVolunteersReducer,
 totalRequestsVol : totalfoodRequestVolReducer
});

let initialState = {
  user: {
  
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;