import * as productConstants from '../constants/productConstants';

export const listProducts = (state = { products: [] }, action) => {
  switch (action.type) {
    case productConstants.PRODUCTLIST_FETCH_START:
      return {
        loading: true,
        products: [],
      };
    case productConstants.PRODUCTLIST_FETCH_SUCCESS:
      return {
        products: action.payload.results,
        count: action.payload.count,
        success: true,
      };
    case productConstants.PRODUCTLIST_FETCH_ERROR:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const Product = (state = { product: {} }, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_FETCH_START:
      return {
        loading: true,
        product: {},
      };
    case productConstants.PRODUCT_FETCH_SUCCESS:
      return {
        product: action.payload,
        success: true,
      };
    case productConstants.PRODUCT_FETCH_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productReview = (state = { productReviews: [] }, action) => {
  switch (action.type) {
    case productConstants.PRODUCTREVIEW_FETCH_START:
      return {
        loading: true,
        productReviews: [],
      };
    case productConstants.PRODUCTREVIEW_FETCH_SUCCESS:
      return {
        productReviews: action.payload.data,
        count: action.payload.count,
        success: true,
      };
    case productConstants.PRODUCT_FETCH_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createReview = (state = {}, action) => {
  switch (action.type) {
    case productConstants.CREATE_REVIEW_START:
      return {
        loading: true,
      };
    case productConstants.CREATE_REVIEW_SUCCESS:
      return {
        success: true,
      };
    case productConstants.CREATE_REVIEW_FAIL:
      return {
        error: action.payload,
      };
    case productConstants.CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteProduct = (state = {}, action) => {
  switch (action.type) {
    case productConstants.DELETE_PRODUCT_START:
      return {
        loading: true,
      };
    case productConstants.DELETE_PRODUCT_SUCCESS:
      return {
        success: true,
      };
    case productConstants.DELETE_PRODUCT_FAIL:
      return {
        error: action.payload,
      };

    case productConstants.DELETE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const createProduct = (state = {}, action) => {
  switch (action.type) {
    case productConstants.CREATE_PRODUCT_START:
      return {
        loading: true,
      };
    case productConstants.CREATE_PRODUCT_SUCCESS:
      return {
        success: true,
      };
    case productConstants.CREATE_PRODUCT_FAIL:
      return {
        error: action.payload,
      };

    case productConstants.CREATE_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const EditProduct = (state = {}, action) => {
  switch (action.type) {
    case productConstants.EDIT_PRODUCT_START:
      return {
        loading: true,
      };
    case productConstants.EDIT_PRODUCT_SUCCESS:
      return {
        success: true,
      };
    case productConstants.EDIT_PRODUCT_FAIL:
      return {
        error: action.payload,
      };
    case productConstants.EDIT_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
