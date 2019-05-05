import RestService from '../_services/RestService';
import StorageService from '../_services/StorageService';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../_constants/ActionTypes';

requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  }
}

receiveLogin = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data,
  }
}

failLogin = (error) => {
  return {
    type: LOGIN_ERROR,
    message: error,
  }
}

export const fetchLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestLogin());

      let response = await RestService.post('login', data);
      await StorageService.set('token', response.token);

      dispatch(receiveLogin(response));
    }
    catch(error) {
      dispatch(failLogin(error));
    }
  }
}