import * as orderServices from "../services/order";
import { handleError } from "../utils/error";
import * as orderConstants from "../constants/orderConstants";
import * as cartConstants from "../constants/cartConstants";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: orderConstants.CREATE_ORDER_START });

    const { data } = await orderServices.createOrder(orderData);

    dispatch({
      type: orderConstants.CREATE_ORDER_SUCCESS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    dispatch({
      type: cartConstants.CART_RESET,
    });
  } catch (err) {
    dispatch({
      type: orderConstants.CREATE_ORDER_FAIL,
      payload: handleError(err),
    });
  }
};

export const getOrder = (orderId, initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: orderConstants.GET_ORDER_START });
    }

    const { data } = await orderServices.order(orderId);

    dispatch({
      type: orderConstants.GET_ORDER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderConstants.GET_ORDER_FAIL,
      payload: handleError(err),
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.ORDER_PAY_START,
    });

    const { message } = await orderServices.pay(orderId, paymentResult);

    dispatch({
      type: orderConstants.ORDER_PAY_SUCCESS,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: orderConstants.ORDER_PAY_FAIL,
      payload: handleError(err),
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DILIVERD_START,
    });

    const { data } = await orderServices.deliverOrder(orderId);

    dispatch({
      type: orderConstants.ORDER_DILIVERD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: orderConstants.ORDER_DILIVERD_FAIL,
      payload: handleError(err),
    });
  }
};

export const authOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.AUTH_ORDER_FETCH_START,
    });

    const { data, count } = await orderServices.userOrder();

    dispatch({
      type: orderConstants.AUTH_ORDER_FETCH_SUCCESS,
      payload: data,
      total: count,
    });
  } catch (err) {
    dispatch({
      type: orderConstants.AUTH_ORDER_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

export const listOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: orderConstants.ORDERLIST_FETCH_START,
    });

    const { results, count } = await orderServices.orders();

    dispatch({
      type: orderConstants.ORDERLIST_FETCH_SUCCESS,
      payload: {
        results,
        count,
      },
    });
  } catch (err) {
    dispatch({
      type: orderConstants.ORDERLIST_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};
