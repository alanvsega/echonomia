import Immutable from 'seamless-immutable';

import {
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  ANSWER_SUCCESS,
  QUESTION_ERROR,
} from '../_constants/ActionTypes';

const initialState = Immutable({
  loading: false,
  data: null,
  message: '',
});

export default question = (state = initialState, action) => {
  switch (action.type) {
    case QUESTION_REQUEST: {
      return state.merge({
        loading: true,
        message: '',
      })
    }
    case QUESTION_SUCCESS: {
      return state.merge({
        loading: false,
        data: action.data,
        message: action.message ? action.message : '',
      })
    }
    case ANSWER_SUCCESS: {
      return state.merge({
        loading: false,
        data: null,
        message: action.message ? action.message : '',
      })
    }
    case QUESTION_ERROR: {
      return state.merge({
        loading: false,
        data: null,
        message: action.message ? action.message : '',
      })
    }
    default: {
      return state;
    }
  }
}

export const getQuestions = (state) => {
  return state.question.data;
}

export const getMessage = (state) => {
  return state.question.message;
}

export const isLoading = (state) => {
  return state.question.loading;
}