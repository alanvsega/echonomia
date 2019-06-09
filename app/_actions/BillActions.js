import RestService from '../_services/RestService';

import {
  BILL_REQUEST,
  BILL_SUCCESS,
  BILL_LIST_SUCCESS,
  BILL_ERROR,
  BILL_UPDATE_ERROR,
} from '../_constants/ActionTypes';

export const request = () => {
  return {
    type: BILL_REQUEST,
  }
}

export const receive = (type, data, msg = '') => {
  return {
    type: type,
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

      dispatch(receive(BILL_SUCCESS, response.data.bill, 'Conta adicionada com sucesso.'));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}

export const fetchUpdate = (data) => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.patchAuthenticated('bill/' + data.billId, data);

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(BILL_SUCCESS, response.data.bill, 'Conta atualizada com sucesso.'));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}

export const fetchList = () => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.getAuthenticated('bills');

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(BILL_LIST_SUCCESS, response.data.bills));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}