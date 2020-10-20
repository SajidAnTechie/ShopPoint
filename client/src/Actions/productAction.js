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

export const listProductsForAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.PRODUCTLIST_FETCH_START });

    await axios.get(`/api/v1/product/`).then((resp) => {
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

export const product = (id, initialLoading) => async (dispatch) => {
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

export const createReview = (id, title, text, rating) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: productConstants.CREATE_REVIEW_START });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const data = {
      title,
      text,
      rating,
    };
    await axios
      .post(`/api/v1/product/${id}/reviews`, data, config)
      .then((resp) => {
        dispatch({
          type: productConstants.CREATE_REVIEW_SUCCESS,
        });
      });
  } catch (error) {
    dispatch({
      type: productConstants.CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.DELETE_PRODUCT_START });

    await axios.delete(`/api/v1/product/${id}`).then((resp) => {
      const message = resp.data.message;

      dispatch({
        type: productConstants.DELETE_PRODUCT_SUCCESS,
        payload: message,
      });
    });
  } catch (error) {
    dispatch({
      type: productConstants.DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
