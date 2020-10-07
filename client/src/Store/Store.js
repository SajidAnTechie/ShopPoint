import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  listProducts,
  Product,
  productReview,
} from "../Reducers/productReducer";

const rootReducer = combineReducers({
  productList: listProducts,
  Product: Product,
  productReview: productReview,
});

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
