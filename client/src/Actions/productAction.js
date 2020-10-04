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
      dispatch({ type: productConstants.PRODUCT_FETCH_START });
    }

    const queryString = [
      sort.length > 0 ? `sort=${sort.join(",")}` : "",
      searchProductKey !== "" ? `&keyWord=${searchProductKey}` : "",
      category !== "" ? `&category=${category}` : "",
      priceRange !== "" ? `&price[${ltORgt}]=${priceRange}` : "",
    ];

    await axios.get(`/api/v1/product/?${queryString.join("")}`).then((resp) => {
      const productList = resp.data.data.results;
      const totalProduct = resp.data.data.count;

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
