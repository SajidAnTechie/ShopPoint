import axios from "axios";
import * as cartConstants from "../Constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    await axios.get(`/api/v1/product/${id}`).then((resp) => {
      const data = resp.data.data;

      dispatch({
        type: cartConstants.ADD_TO_CART_ITEM,
        payload: {
          productId: data._id,
          productName: data.name,
          productImage: data.productImage,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        },
      });
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: cartConstants.ADD_TO_CART_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: cartConstants.CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: cartConstants.CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: cartConstants.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
