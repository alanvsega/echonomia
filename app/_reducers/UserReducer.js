import Immutable from 'seamless-immutable';

import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  USER_UPDATE_ERROR,
  USER_LOGOUT,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: null,
  message: '',
});

export default user = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST: {
      return state.merge({
        loading: true,
        message: '',
      })
    }
    case USER_SUCCESS: {
      return state.merge({
        loading: false,
        data: action.data,
        message: action.message ? action.message : '',
      })
    }
    case USER_ERROR: {
      return state.merge({
        loading: false,
        data: null,
        message: action.message ? action.message : '',
      })
    }
    case USER_UPDATE_ERROR: {
      return state.merge({
        loading: false,
        message: action.message ? action.message : '',
      })
    }
    case USER_LOGOUT: {
      return state.merge({
        loading: false,
        data: null,
        message: '',
      })
    }
    default: {
      return state;
    }
  }
}

export const getUserData = (state) => {
  return state.user.data;
}

export const getMessage = (state) => {
  return state.user.message;
}

export const isLoading = (state) => {
  return state.user.loading;
}