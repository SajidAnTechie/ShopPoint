import * as cartConstants from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.productId === item.productId);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.productId === existItem.productId ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case cartConstants.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.productId !== action.payload),
      };
    case cartConstants.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case cartConstants.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case cartConstants.CART_RESET:
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
      };
    default:
      return state;
  }
};
