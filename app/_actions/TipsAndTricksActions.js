import RestService from '../_services/RestService';

import {
  TIPS_AND_TRICKS_REQUEST,
  TIPS_AND_TRICKS_SUCCESS,
  TIPS_AND_TRICKS_RANDOM_SUCCESS,
  TIPS_AND_TRICKS_ERROR,
} from '../_constants/ActionTypes';

export const request = () => {
  return {
    type: TIPS_AND_TRICKS_REQUEST,
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
    type: TIPS_AND_TRICKS_ERROR,
    message: error,
  }
}

export const fetchRandomTip = () => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.getAuthenticated('tip');

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(TIPS_AND_TRICKS_RANDOM_SUCCESS, response.data.tip));
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

      let response = await RestService.getAuthenticated('tips');

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(TIPS_AND_TRICKS_SUCCESS, response.data.tips));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}