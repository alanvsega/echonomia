import Immutable from 'seamless-immutable';

import {
  BILL_REQUEST,
  BILL_SUCCESS,
  BILL_ERROR,
  BILL_UPDATE_ERROR,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: null,
  message: '',
});

export default bill = (state = initialState, action) => {
  switch (action.type) {
    case BILL_REQUEST: {
      return state.merge({
        loading: true,
        message: '',
      })
    }
    case BILL_SUCCESS: {
      return state.merge({
        loading: false,
        data: action.data,
        message: action.message ? action.message : '',
      })
    }
    case BILL_ERROR: {
      return state.merge({
        loading: false,
        data: null,
        message: action.message ? action.message : '',
      })
    }
    case BILL_UPDATE_ERROR: {
      return state.merge({
        loading: false,
        message: action.message ? action.message : '',
      })
    }
    default: {
      return state;
    }
  }
}

export const getBillData = (state) => {
  return state.bill.data;
}

export const getMessage = (state) => {
  return state.bill.message;
}

export const isLoading = (state) => {
  return state.bill.loading;
}