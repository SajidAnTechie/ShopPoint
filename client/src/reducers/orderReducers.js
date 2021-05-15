import * as orderConstants from '../constants/orderConstants';

export const createOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case orderConstants.CREATE_ORDER_START:
      return {
        loading: true,
      };
    case orderConstants.CREATE_ORDER_SUCCESS:
      return {
        order: action.payload,
        success: true,
      };
    case orderConstants.CREATE_ORDER_FAIL:
      return {
        error: action.payload,
      };
    case orderConstants.CREATE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

export const getOrder = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.GET_ORDER_START:
      return {
        loading: true,
      };
    case orderConstants.GET_ORDER_SUCCESS:
      return {
        order: action.payload,
        success: true,
      };
    case orderConstants.GET_ORDER_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_PAY_START:
      return {
        loading: true,
      };
    case orderConstants.ORDER_PAY_SUCCESS:
      return {
        success: action.payload,
      };
    case orderConstants.ORDER_PAY_FAIL:
      return {
        error: action.payload,
      };
    case orderConstants.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstants.ORDER_DILIVERD_START:
      return {
        loading: true,
      };
    case orderConstants.ORDER_DILIVERD_SUCCESS:
      return {
        success: true,
      };
    case orderConstants.ORDER_DILIVERD_FAIL:
      return {
        error: action.payload,
      };
    case orderConstants.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const authOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.AUTH_ORDER_FETCH_START:
      return {
        loading: true,
      };
    case orderConstants.AUTH_ORDER_FETCH_SUCCESS:
      return {
        success: true,
        orders: action.payload,
        count: action.total,
      };
    case orderConstants.AUTH_ORDER_FETCH_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listOrders = (state = { orders: [] }, action) => {
  switch (action.type) {
    case orderConstants.ORDERLIST_FETCH_START:
      return {
        loading: true,
      };
    case orderConstants.ORDERLIST_FETCH_SUCCESS:
      return {
        success: true,
        orders: action.payload.results,
        count: action.payload.count,
      };
    case orderConstants.ORDERLIST_FETCH_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};
