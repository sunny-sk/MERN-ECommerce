import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

export const userLoginReducer = (
  state = {
    loading: false,
    userInfo: undefined,
    error: undefined,
  },
  action,
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        userInfo: undefined,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: undefined,
      };
    case USER_LOGOUT:
      return {
        loading: false,
        userInfo: undefined,
      };
    default:
      return state;
  }
};
export const userRegisterReducer = (
  state = {
    loading: false,
    userInfo: undefined,
    error: undefined,
  },
  action,
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
        userInfo: undefined,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        error: undefined,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = {
    loading: false,
    user: undefined,
    error: undefined,
  },
  action,
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        error: undefined,
        user: action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        user: undefined,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducers = (
  state = {
    loading: false,
    success: false,
  },
  action,
) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: undefined,
        user: action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        user: undefined,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
