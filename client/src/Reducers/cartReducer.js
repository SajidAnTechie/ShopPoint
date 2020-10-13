import * as cartConstants from "../Constants/cartConstants";

export const cartReducer = (state = { cartItems:[]}, action) => {
    switch (action.type) {
      case cartConstants.ADD_TO_CART_ITEM:
        const item = action.payload

        const existItem = state.cartItems.find((x) => x.productId === item.productId)
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.productId === existItem.productId ? item : x
            ),
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
        }
        case cartConstants.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.productId !== action.payload),
              }
      default:
        return state;
    }
  };