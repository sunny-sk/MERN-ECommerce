import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
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
