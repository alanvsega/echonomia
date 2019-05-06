import RestService from '../_services/RestService';
import StorageService from '../_services/StorageService';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../_constants/ActionTypes';

export const requestRegister = () => {
  return {
    type: REGISTER_REQUEST,
  }
}

export const receiveRegister = (data) => {
  return {
    type: REGISTER_SUCCESS,
    data: data,
  }
}

export const failRegister = (error) => {
  return {
    type: REGISTER_ERROR,
    message: error,
  }
}

export const fetchRegister = (data) => {
  return async (dispatch) => {
    try {
      dispatch(requestRegister());

      let request = await RestService.post('user', data);
      await StorageService.set('userData', request.data);

      response = request.data;

      if(!response || !response.user || !response.token) {
        await StorageService.unset('userData');
        throw response;
      }

      dispatch(receiveRegister(response));
    }
    catch(error) {
      dispatch(failRegister(error));
    }
  }
}