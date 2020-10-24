import axios from "axios";
import * as userConstants from "../Constants/userConstants";

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

export const Logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
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
