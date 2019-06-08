import Immutable from 'seamless-immutable';

import {
  BILL_REQUEST,
  BILL_SUCCESS,
  BILL_LIST_SUCCESS,
  BILL_ERROR,
  BILL_UPDATE_ERROR,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: {
    list: null,
    bill: null,
  },
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
        data: {
          ...state.data,
          bill: action.data,
        },
        message: action.message ? action.message : '',
      })
    }
    case BILL_LIST_SUCCESS: {
      return state.merge({
        loading: false,
        data: {
          ...state.data,
          list: action.data,
        },
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

export const getBills = (state) => {
  console.log('bills', state.bill.data.list);
  return state.bill.data.list;
}

export const getBill = (state) => {
  return state.bill.data.bill;
}

export const getMessage = (state) => {
  return state.bill.message;
}

export const isLoading = (state) => {
  return state.bill.loading;
}