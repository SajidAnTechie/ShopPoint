import axios from "axios";
import * as orderConstants from "../constants/orderConstants";
import * as cartConstants from "../constants/cartConstants";

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: orderConstants.CREATE_ORDER_START });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post("/api/v1/order/", orderData, config).then((resp) => {
      const data = resp.data.data;

      dispatch({
        type: orderConstants.CREATE_ORDER_SUCCESS,
        payload: data,
      });
    });

    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    dispatch({
      type: cartConstants.CART_RESET,
    });
  } catch (error) {
    dispatch({
      type: orderConstants.CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const getOrder = (orderId, initialLoading) => async (
  dispatch,
  getState
) => {
  try {
    if (initialLoading) {
      dispatch({ type: orderConstants.GET_ORDER_START });
    }

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.get(`/api/v1/order/${orderId}`, config).then((resp) => {
      const data = resp.data.data;

      dispatch({
        type: orderConstants.GET_ORDER_SUCCESS,
        payload: data,
      });
    });
  } catch (error) {
    dispatch({
      type: orderConstants.GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: orderConstants.ORDER_PAY_START,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios
      .post(`/api/v1/order/${orderId}/pay`, paymentResult, config)
      .then((resp) => {
        const data = resp.data.data;

        dispatch({
          type: orderConstants.ORDER_PAY_SUCCESS,
          payload: data,
        });
      });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DILIVERD_START,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios
      .post(`/api/v1/order/${orderId}/deliver`, {}, config)
      .then((resp) => {
        const data = resp.data.data;

        dispatch({
          type: orderConstants.ORDER_DILIVERD_SUCCESS,
          payload: data,
        });
      });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DILIVERD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const authOrder = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.AUTH_ORDER_FETCH_START,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.get(`/api/v1/order/authOrders`, config).then((resp) => {
      const data = resp.data.data;
      const count = resp.data.count;

      dispatch({
        type: orderConstants.AUTH_ORDER_FETCH_SUCCESS,
        payload: data,
        total: count,
      });
    });
  } catch (error) {
    dispatch({
      type: orderConstants.AUTH_ORDER_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDERLIST_FETCH_START,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.get(`/api/v1/order/`, config).then((resp) => {
      const data = resp.data.results;
      const totalOrders = resp.data.count;

      dispatch({
        type: orderConstants.ORDERLIST_FETCH_SUCCESS,
        payload: {
          data,
          totalOrders,
        },
      });
    });
  } catch (error) {
    dispatch({
      type: orderConstants.ORDERLIST_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
