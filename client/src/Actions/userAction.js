import axios from "axios";
import * as userConstants from "../constants/userConstants";
import * as tokenService from "../services/token";

export const auth = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_AUTH_START });

    const authData = {
      email,
      password,
    };

    await axios.post(`/api/v1/auth/login`, authData).then((resp) => {
      const authData = resp.data.authData;
      const token = resp.data.token;

      const userInfo = {
        ...authData,
        token,
      };

      tokenService.setToken(userInfo);
      dispatch({
        type: userConstants.USER_AUTH_SUCCESS,
        payload: userInfo,
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_AUTH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const Logout = () => (dispatch) => {
  tokenService.removeToken();
  dispatch({ type: userConstants.RESET });
};

export const Register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_START });

    const registerData = {
      name,
      email,
      password,
    };

    await axios.post(`/api/v1/auth/register`, registerData).then((resp) => {
      const consfirmMessage = resp.data.message;

      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: consfirmMessage,
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const emailVerification = (verificationCode) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_AUTH_START });

    const code = {
      verificationCode,
    };

    await axios.post(`/api/v1/auth/verifyEmail`, code).then((resp) => {
      const authData = resp.data.authData;
      const token = resp.data.token;

      const userInfo = {
        ...authData,
        token,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      dispatch({
        type: userConstants.USER_AUTH_SUCCESS,
        payload: userInfo,
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_AUTH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const userList = (initialLoading) => async (dispatch, getState) => {
  try {
    if (initialLoading) {
      dispatch({ type: userConstants.USERLIST_FETCH_START });
    }

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.get(`/api/v1/user`, config).then((resp) => {
      const userList = resp.data.data.results;
      const totalUser = resp.data.data.count;
      dispatch({
        type: userConstants.USERLIST_FETCH_SUCCESS,
        payload: {
          userList,
          totalUser,
        },
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.USERLIST_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const userDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_START });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/user/${id}`, config).then((resp) => {
      dispatch({
        type: userConstants.USER_DELETE_SUCCESS,
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const userUpdate = (id, updatedData) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_EDIT_START });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/v1/user/${id}`, updatedData, config).then((resp) => {
      dispatch({
        type: userConstants.USER_EDIT_SUCCESS,
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_EDIT_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_FETCH_START });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.get(`/api/v1/user/${id}`, config).then((resp) => {
      const userDetails = resp.data.data;
      dispatch({
        type: userConstants.USER_FETCH_SUCCESS,
        payload: userDetails,
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.USER_FETCH_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.FORGOT_PASSWORD_SEND_START });

    await axios.post(`/api/v1/auth/forgotPassword`, email).then((resp) => {
      const confirmMessage = resp.data.message;
      dispatch({
        type: userConstants.FORGOT_PASSWORD_SEND_SUCCESS,
        payload: confirmMessage,
      });
    });
  } catch (error) {
    dispatch({
      type: userConstants.FORGOT_PASSWORD_SEND_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const resetPassword = (resetPasswordData) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.RESET_PASSWORD_START });

    await axios
      .post(`/api/v1/auth/resetPassword`, resetPasswordData)
      .then((resp) => {
        const confirmMessage = resp.data.message;
        dispatch({
          type: userConstants.RESET_PASSWORD_SUCCESS,
          payload: confirmMessage,
        });
      });
  } catch (error) {
    dispatch({
      type: userConstants.RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
