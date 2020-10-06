import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listProducts, Product } from "../Reducers/productReducer";

const rootReducer = combineReducers({
  productList: listProducts,
  Product: Product,
});

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
