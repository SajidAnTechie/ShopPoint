import axios from "axios";
import * as orderConstants from "../Constants/orderConstants";

export const createOrder = (orderData) => async (dispatch,getState) => {
    try {

        dispatch({ type: orderConstants.CREATE_ORDER_START });

        const {
          userLogin: { userInfo },
        } = getState()
  
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
    
      await axios.post("/api/v1/order/",orderData,config).then((resp) => {
        const data = resp.data.data;
  
        dispatch({
          type: orderConstants.CREATE_ORDER_SUCCESS,
          payload: data,
        });
      });

    } catch (error) {
      dispatch({
        type: orderConstants.CREATE_ORDER_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
};

export const getOrder = (orderId,initialLoading) => async (dispatch,getState) => {
    try {

        if (initialLoading) {
        dispatch({ type: orderConstants.GET_ORDER_START });
        }

        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
    
      await axios.get(`/api/v1/order/${orderId}`,config).then((resp) => {
        const data = resp.data.data;
  
        dispatch({
          type: orderConstants.GET_ORDER_SUCCESS,
          payload: data,
        });
      });

    } catch (error) {
      dispatch({
        type: orderConstants.GET_ORDER_FAIL,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.message,
      });
    }
};


export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: orderConstants.ORDER_PAY_START,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

     await axios.post(
      `/api/v1/order/${orderId}/pay`,
      paymentResult,
      config
    ).then((resp)=>{

      const data = resp.data.data;

      dispatch({
        type: orderConstants.ORDER_PAY_SUCCESS,
        payload: data,
      })
    })

  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: orderConstants.ORDER_DILIVERD_START,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(
      `/api/v1/order/${orderId}/deliver`,
      {},
      config
    ).then((resp)=>{

      const data = resp.data.data;

      dispatch({
        type: orderConstants.ORDER_DILIVERD_SUCCESS,
        payload: data,
      })
    })
 
  } catch (error) {
    dispatch({
      type: orderConstants.ORDER_DILIVERD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}