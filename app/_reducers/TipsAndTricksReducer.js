import Immutable from 'seamless-immutable';

import {
  TIPS_AND_TRICKS_REQUEST,
  TIPS_AND_TRICKS_SUCCESS,
  TIPS_AND_TRICKS_RANDOM_SUCCESS,
  TIPS_AND_TRICKS_ERROR,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: {
    list: null,
    tip: null,
  },
  message: '',
});

export default tipsAndTricks = (state = initialState, action) => {
  switch (action.type) {
    case TIPS_AND_TRICKS_REQUEST: {
      return state.merge({
        loading: true,
        message: '',
      })
    }
    case TIPS_AND_TRICKS_SUCCESS: {
      return state.merge({
        loading: false,
        data: {
          ...state.data,
          list: action.data,
        },
        message: action.message ? action.message : '',
      })
    }
    case TIPS_AND_TRICKS_RANDOM_SUCCESS: {
      return state.merge({
        loading: false,
        data: {
          ...state.data,
          tip: action.data,
        },
        message: action.message ? action.message : '',
      })
    }
    case TIPS_AND_TRICKS_ERROR: {
      return state.merge({
        loading: false,
        data: {
          list: null,
          tip: null,
        },
        message: action.message ? action.message : '',
      })
    }
    default: {
      return state;
    }
  }
}

export const getTipsAndTricks = (state) => {
  return state.tipsAndTricks.data.list;
}

export const getTip = (state) => {
  return state.tipsAndTricks.data.tip;
}

export const getMessage = (state) => {
  return state.tipsAndTricks.message;
}

export const isLoading = (state) => {
  return state.tipsAndTricks.loading;
}