import RestService from '../_services/RestService';

import {
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  ANSWER_SUCCESS,
  QUESTION_ERROR,
} from '../_constants/ActionTypes';

export const request = () => {
  return {
    type: QUESTION_REQUEST,
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
    type: QUESTION_ERROR,
    message: error,
  }
}

export const fetchList = () => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.getAuthenticated('questions');

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(QUESTION_SUCCESS, response.data.questions));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}

export const fetchAnswers = (data) => {
  return async (dispatch) => {
    try {
      dispatch(request());
      
      let response = await RestService.postAuthenticated('answers', data);

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      dispatch(receive(ANSWER_SUCCESS, response.data.answers));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}