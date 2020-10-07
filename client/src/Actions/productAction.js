import axios from "axios";
import * as productConstants from "../Constants/productConstants";

export const listProducts = (
  searchProductKey,
  sort,
  category,
  priceRange,
  initialLoading,
  ltORgt
) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: productConstants.PRODUCTLIST_FETCH_START });
    }

    const queryString = [
      sort.length > 0 ? `sort=${sort.join(",")}` : "",
      searchProductKey !== "" ? `&keyWord=${searchProductKey}` : "",
      category !== "" ? `&category=${category}` : "",
      priceRange !== "" ? `&price[${ltORgt}]=${Number(priceRange)}` : "",
    ];

    await axios.get(`/api/v1/product/?${queryString.join("")}`).then((resp) => {
      const productList = resp.data.data.results;
      const totalProduct = resp.data.data.count;

      dispatch({
        type: productConstants.PRODUCTLIST_FETCH_SUCCESS,
        payload: { productList, totalProduct },
      });
    });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCTLIST_FETCH_ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const Product = (id, initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: productConstants.PRODUCT_FETCH_START });
    }

    await axios.get(`/api/v1/product/${id}`).then((resp) => {
      const product = resp.data.data;

      dispatch({
        type: productConstants.PRODUCT_FETCH_SUCCESS,
        payload: product,
      });
    });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const productReview = (id, initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: productConstants.PRODUCTREVIEW_FETCH_START });
    }
    await axios.get(`/api/v1/product/${id}/reviews`).then((resp) => {
      const productReviews = resp.data.data;
      const totalReview = resp.data.count;

      dispatch({
        type: productConstants.PRODUCTREVIEW_FETCH_SUCCESS,
        payload: {
          productReviews,
          totalReview,
        },
      });
    });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCTREVIEW_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
