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
    case userConstants.RESET:
      return {};

    default:
      return state;
  }
};

export const userRegister = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_START:
      return {
        loading: true,
      };
    case userConstants.USER_REGISTER_SUCCESS:
      return {
        message: action.payload,
        success: true,
      };
    case userConstants.USER_REGISTER_FAIL:
      return {
        error: action.payload,
      };
    case userConstants.USER_REGISTER_RESET:
      return {};

    default:
      return state;
  }
};

export const userList = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.USERLIST_FETCH_START:
      return {
        loading: true,
      };
    case userConstants.USERLIST_FETCH_SUCCESS:
      return {
        users: action.payload.userList,
        count: action.payload.totalUser,
        success: true,
      };
    case userConstants.USERLIST_FETCH_FAIL:
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};
export const userDelete = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_DELETE_START:
      return {
        loading: true,
      };
    case userConstants.USER_DELETE_SUCCESS:
      return {
        success: true,
      };
    case userConstants.USER_DELETE_FAIL:
      return {
        error: action.payload,
      };
    case userConstants.USER_DELETE_RESET:
      return {};

    default:
      return state;
  }
};
