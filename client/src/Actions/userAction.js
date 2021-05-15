import * as userServices from '../services/user';
import { handleError } from '../utils/error';
import * as userConstants from '../constants/userConstants';
import * as tokenService from '../services/token';

export const auth = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_AUTH_START });

    const body = {
      email,
      password,
    };

    const { authData, token } = await userServices.login(body);

    const userInfo = {
      ...authData,
      token,
    };

    tokenService.setToken(userInfo);
    dispatch({
      type: userConstants.USER_AUTH_SUCCESS,
      payload: userInfo,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_AUTH_FAIL,
      payload: handleError(err),
    });
  }
};

export const Logout = () => (dispatch) => {
  tokenService.removeToken();
  dispatch({ type: userConstants.RESET });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_START });

    const body = {
      name,
      email,
      password,
    };
    const { message } = await userServices.registerUser(body);

    dispatch({
      type: userConstants.USER_REGISTER_SUCCESS,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_REGISTER_FAIL,
      payload: handleError(err),
    });
  }
};

export const emailVerification = (verificationCode) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_AUTH_START });

    const code = {
      verificationCode,
    };

    const { authData, token } = await userServices.verifyEmail(code);

    const userInfo = {
      ...authData,
      token,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    dispatch({
      type: userConstants.USER_AUTH_SUCCESS,
      payload: userInfo,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_AUTH_FAIL,
      payload: handleError(err),
    });
  }
};

export const userList = (initialLoading) => async (dispatch) => {
  try {
    if (initialLoading) {
      dispatch({ type: userConstants.USERLIST_FETCH_START });
    }

    const { results, count } = await userServices.fetchUsers();

    dispatch({
      type: userConstants.USERLIST_FETCH_SUCCESS,
      payload: {
        results,
        count,
      },
    });
  } catch (err) {
    dispatch({
      type: userConstants.USERLIST_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

export const userDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_START });

    await userServices.deleteUser(id);

    dispatch({
      type: userConstants.USER_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_DELETE_FAIL,
      payload: handleError(err),
    });
  }
};

export const updateUser = (id, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_EDIT_START });

    await userServices.updateUser(id, updatedData);

    dispatch({
      type: userConstants.USER_EDIT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_EDIT_FAIL,
      payload: handleError(err),
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_FETCH_START });

    const data = await userServices.fetchUser(id);

    dispatch({
      type: userConstants.USER_FETCH_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_FETCH_FAIL,
      payload: handleError(err),
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.FORGOT_PASSWORD_SEND_START });

    const { message } = await userServices.forgotPassword(email);

    dispatch({
      type: userConstants.FORGOT_PASSWORD_SEND_SUCCESS,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: userConstants.FORGOT_PASSWORD_SEND_FAIL,
      payload: handleError(err),
    });
  }
};

export const resetPassword = (resetPasswordData) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.RESET_PASSWORD_START });

    const { message } = await userServices.resetPassword(resetPasswordData);

    dispatch({
      type: userConstants.RESET_PASSWORD_SUCCESS,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: userConstants.RESET_PASSWORD_FAIL,
      payload: handleError(err),
    });
  }
};
