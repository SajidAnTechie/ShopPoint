import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listProducts } from "../Reducers/productReducer";

const rootReducer = combineReducers({
  productList: listProducts,
});

const initialState = {};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
