import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  listProducts,
  Product,
  productReview,
  createReview,
} from "../Reducers/productReducer";

import { userLogin,userRegister } from "../Reducers/userReducer";
import { cartReducer } from "../Reducers/cartReducer";


const rootReducer = combineReducers({
  productList: listProducts,
  Product: Product,
  productReview: productReview,
  userLogin: userLogin,
  userRegister:userRegister,
  createReview:createReview,
  cart:cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart:{
    cartItems:cartItemsFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
