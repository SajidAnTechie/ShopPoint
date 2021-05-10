import * as productServices from "../services/Product";
import { handleError } from "../utils/error";
import * as cartConstants from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const data = await productServices.fetchProduct(id);

    dispatch({
      type: cartConstants.ADD_TO_CART_ITEM,
      payload: payLoadForCartItem(data, qty),
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {
    dispatch({
      type: cartConstants.ADD_TO_CART_FAIL,
      payload: handleError(err),
    });
  }
};

export const payLoadForCartItem = (data, qty) => {
  return {
    productId: data._id,
    productName: data.name,
    productImage: data.productImage,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  };
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
