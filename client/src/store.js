import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  listProducts,
  Product,
  productReview,
  createReview,
  deleteProduct,
  createProduct,
  EditProduct,
} from './reducers/productReducers';

import {
  userLogin,
  userRegister,
  userList,
  userDelete,
  userUpdate,
  getUser,
  forgotPassword,
  resetPassword,
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  createOrderReducer,
  getOrder,
  orderPayReducer,
  orderDeliverReducer,
  authOrders,
  listOrders,
} from './reducers/orderReducers';

const rootReducer = combineReducers({
  productList: listProducts,
  Product: Product,
  productReview: productReview,
  userLogin: userLogin,
  userRegister: userRegister,
  createReview: createReview,
  cart: cartReducer,
  createOrder: createOrderReducer,
  orderDetails: getOrder,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  authOrders: authOrders,
  orderList: listOrders,
  deleteProduct: deleteProduct,
  createProductDetails: createProduct,
  updateProductDetails: EditProduct,
  userList: userList,
  userDeleteDetails: userDelete,
  userUpdateDetails: userUpdate,
  userDetails: getUser,
  forgotPasswordDetails: forgotPassword,
  resetPasswordDetails: resetPassword,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentMethodAddressFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
