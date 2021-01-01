import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
} from '../constants/orderConstants';

import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/orders`,
      order,
      config,
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/${id}`,
      config,
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data.updatedOrder,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/orders/myOrders`,
      config,
    );

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/orders`,
      config,
    );

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    await axios.put(
      `http://localhost:5000/api/orders/${orderId}/deliver`,
      {},
      config,
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
