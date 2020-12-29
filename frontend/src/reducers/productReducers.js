import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
} from '../constants/productConstants';
export const productListReducer = (
  state = {
    products: [],
    loading: false,
    error: undefined,
  },
  action,
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [], error: undefined };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload, error: undefined };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = {
    product: {
      review: [],
    },
    loading: false,
    error: undefined,
  },
  action,
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload, error: undefined };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = {
    loading: false,
    error: undefined,
    success: false,
  },
  action,
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, error: undefined };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, success: true, error: action.payload };
    default:
      return state;
  }
};
