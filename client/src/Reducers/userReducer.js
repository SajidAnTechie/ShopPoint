import * as userConstants from "../Constants/userConstants";

export const userLogin = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_AUTH_START:
      return {
        loading: true,
      };
    case userConstants.USER_AUTH_SUCCESS:
      return {
        userInfo: action.payload,
        success: true,
      };
    case userConstants.USER_AUTH_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
