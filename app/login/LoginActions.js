import RestService from '../_services/RestService';
import StorageService from '../_services/StorageService';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../_constants/ActionTypes';

export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  }
}

export const receiveLogin = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data,
  }
}

export const failLogin = (error) => {
  return {
    type: LOGIN_ERROR,
    message: error,
  }
}

export const fetchLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestLogin());

      let response = null;

      if(data) {
        request = await RestService.post('login', data);
        await StorageService.set('userData', request.data);

        response = request.data;
      }
      else {
        response = await StorageService.get('userData');
      }

      if(!response || !response.user || !response.token) {
        await StorageService.unset('userData');
        throw response;
      }

      dispatch(receiveLogin(response));
    }
    catch(error) {
      dispatch(failLogin(error));
    }
  }
}