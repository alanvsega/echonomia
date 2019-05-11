import Immutable from 'seamless-immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT_SUCCESS,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: null,
  message: '',
});

export default user = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case LOGIN_REQUEST: {
      return state.merge({
        loading: true,
        data: null,
        message: '',
      })
    }
    case LOGIN_SUCCESS: {
      return state.merge({
        loading: false,
        data: action.data,
        message: '',
      })
    }
    case LOGIN_ERROR: {
      return state.merge({
        loading: false,
        data: null,
        message: action.message ? action.message : '',
      })
    }
    //REGISTER
    case REGISTER_REQUEST: {
      return state.merge({
        loading: true,
        data: null,
        message: '',
      })
    }
    case REGISTER_SUCCESS: {
      return state.merge({
        loading: false,
        data: action.data,
        message: '',
      })
    }
    case REGISTER_ERROR: {
      return state.merge({
        loading: false,
        data: null,
        message: action.message ? action.message : '',
      })
    }
    //LOGOUT
    case LOGOUT_SUCCESS: {
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