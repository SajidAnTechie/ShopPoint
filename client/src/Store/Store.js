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
import { createOrderReducer,getOrder,orderPayReducer,orderDeliverReducer } from "../Reducers/orderReducer";


const rootReducer = combineReducers({
  productList: listProducts,
  Product: Product,
  productReview: productReview,
  userLogin: userLogin,
  userRegister:userRegister,
  createReview:createReview,
  cart:cartReducer,
  createOrder:createOrderReducer,
  orderDetails:getOrder,
  orderPay: orderPayReducer,
  orderDeliver:orderDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodAddressFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ""

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart:{
    cartItems:cartItemsFromStorage,
    shippingAddress:shippingAddressFromStorage,
    paymentMethod:paymentMethodAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
