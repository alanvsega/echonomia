import RestService from '../_services/RestService';

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
      dispatch({ type: EMPTY_BILLS_DATA });
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
      dispatch({ type: EMPTY_BILLS_DATA });
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

export const fetchMonthEconomy = () => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.getAuthenticated('bills/MonthEconomy');

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(MONTH_ECONOMY_SUCCESS, response.data.echonomy));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}

export const fetchChart = () => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.getAuthenticated('bills/ConsumeChart');

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(CHART_SUCCESS, response.data));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}