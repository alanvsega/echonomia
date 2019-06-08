import RestService from '../_services/RestService';

import {
  BILL_REQUEST,
  BILL_SUCCESS,
  BILL_ERROR,
  BILL_UPDATE_ERROR,
} from '../_constants/ActionTypes';

export const request = () => {
  return {
    type: BILL_REQUEST,
  }
}

export const receive = (data, msg = '') => {
  return {
    type: BILL_SUCCESS,
    data: data,
    message: msg,
  }
}

export const fail = (error) => {
  return {
    type: BILL_ERROR,
    message: error,
  }
}

export const failUpdate = (error) => {
  return {
    type: BILL_UPDATE_ERROR,
    message: error,
  }
}

export const fetchCreate = (data) => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.postAuthenticated('bill', data);

      if(!response || response.status !== 201) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(response.data.bill));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}