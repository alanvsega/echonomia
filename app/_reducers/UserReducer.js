import Immutable from 'seamless-immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: null,
  message: '',
});

export default user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return state.merge({
        loading: true,
      })
    }
    case LOGIN_SUCCESS: {
      return state.merge({
        loading: false,
        data: action.data,
      })
    }
    case LOGIN_ERROR: {
      return state.merge({
        loading: false,
        message: action.message,
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