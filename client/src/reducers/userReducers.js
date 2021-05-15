import * as userConstants from '../constants/userConstants';

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
        users: action.payload.results,
        count: action.payload.count,
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

export const userUpdate = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_EDIT_START:
      return {
        loading: true,
      };
    case userConstants.USER_EDIT_SUCCESS:
      return {
        success: true,
      };
    case userConstants.USER_EDIT_FAIL:
      return {
        error: action.payload,
      };
    case userConstants.USER_EDIT_RESET:
      return {};

    default:
      return state;
  }
};

export const getUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case userConstants.USER_FETCH_START:
      return {
        loading: true,
      };
    case userConstants.USER_FETCH_SUCCESS:
      return {
        success: true,
        user: action.payload,
      };
    case userConstants.USER_FETCH_FAIL:
      return {
        error: action.payload,
      };
    case userConstants.USER_FETCH_RESET:
      return {};

    default:
      return state;
  }
};

export const forgotPassword = (state = { message: '' }, action) => {
  switch (action.type) {
    case userConstants.FORGOT_PASSWORD_SEND_START:
      return {
        loading: true,
      };
    case userConstants.FORGOT_PASSWORD_SEND_SUCCESS:
      return {
        success: true,
        message: action.payload,
      };
    case userConstants.FORGOT_PASSWORD_SEND_FAIL:
      return {
        error: action.payload,
      };
    case userConstants.FORGOT_PASSWORD_SEND_RSET:
      return {};

    default:
      return state;
  }
};

export const resetPassword = (state = { message: '' }, action) => {
  switch (action.type) {
    case userConstants.RESET_PASSWORD_START:
      return {
        loading: true,
      };
    case userConstants.RESET_PASSWORD_SUCCESS:
      return {
        success: true,
        message: action.payload,
      };
    case userConstants.RESET_PASSWORD_FAIL:
      return {
        error: action.payload,
      };
    case userConstants.RESET_PASSWORD_RESET:
      return {};

    default:
      return state;
  }
};
