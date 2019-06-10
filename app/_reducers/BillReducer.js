import Immutable from 'seamless-immutable';

import {
  BILL_REQUEST,
  BILL_SUCCESS,
  BILL_LIST_SUCCESS,
  MONTH_ECONOMY_SUCCESS,
  CHART_SUCCESS,
  EMPTY_BILLS_DATA,
  BILL_ERROR,
  BILL_UPDATE_ERROR,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: {
    list: null,
    bill: null,
    monthEconomy: null,
    chart: null,
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
    case EMPTY_BILLS_DATA: {
      return state.merge({
        data: {
          monthEconomy: null,
          chart: null,
          list: null,
        },
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
    case MONTH_ECONOMY_SUCCESS: {
      return state.merge({
        loading: false,
        data: {
          ...state.data,
          monthEconomy: action.data,
        },
        message: action.message ? action.message : '',
      })
    }
    case CHART_SUCCESS: {
      return state.merge({
        loading: false,
        data: {
          ...state.data,
          chart: action.data,
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
  return state.bill.data.list;
}

export const getBill = (state) => {
  return state.bill.data.bill;
}

export const getMonthEconomy = (state) => {
  return state.bill.data.monthEconomy;
}

export const getChart = (state) => {
  return state.bill.data.chart;
}

export const getMessage = (state) => {
  return state.bill.message;
}

export const isLoading = (state) => {
  return state.bill.loading;
}