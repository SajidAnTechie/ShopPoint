import axios from "axios";
import * as productConstants from "../Constants/productConstants";

export const listProducts = (
  keyWord,
  sort,
  category,
  priceRange,
  initialLoading
) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: productConstants.PRODUCT_FETCH_START });
    }

    await axios
      .get(
        `/api/v1/product?keyWord=${keyWord}&sort=${sort.join(
          ","
        )}&category=${category}&price=${priceRange}`
      )
      .then((resp) => {
        const productList = resp.data.data;
        const totalProduct = resp.data.count;

        dispatch({
          type: productConstants.PRODUCT_FETCH_SUCCESS,
          payload: { productList, totalProduct },
        });
      });
  } catch (error) {
    dispatch({
      type: productConstants.PRODUCT_FETCH_ERROR,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
