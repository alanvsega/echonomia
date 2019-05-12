import RestService from '../_services/RestService';
import StorageService from '../_services/StorageService';

import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  USER_LOGOUT,
} from '../_constants/ActionTypes';

export const request = () => {
  return {
    type: USER_REQUEST,
  }
}

export const receive = (data, msg = '') => {
  return {
    type: USER_SUCCESS,
    data: data,
    message: msg,
  }
}

export const fail = (error) => {
  return {
    type: USER_ERROR,
    message: error,
  }
}

export const fetchRegister = (data) => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = await RestService.post('user', data);

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      await StorageService.set('user', response.data.user);
      await StorageService.set('token', response.data.token);

      dispatch(receive(response.data.user));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}

export const fetchLogin = (data) => {
  return async (dispatch) => {
    try {
      dispatch(request());

      let response = null;
      let user = null;

      // Regular login
      if(data) {
        response = await RestService.post('login', data);

        if(!response || response.status !== 200) {
          throw (response.data ? response.data : 'Algo deu errado.');
        }

        user = response.data.user;
        await StorageService.set('user', user);
        await StorageService.set('token', response.data.token);
      }
      // Automatic Login
      else {
        user = await StorageService.get('user');

        if(!user) {
          throw null;
        }
      }

      dispatch(receive(user));
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

      console.log(data);

      let response = await RestService.patchAuthenticated('user', data);

      if(!response || response.status !== 200) {
        throw (response.data ? response.data : 'Algo deu errado.');
      }

      await StorageService.set('user', response.data.user);

      dispatch(receive(response.data.user, 'Usuário atualizado com sucesso.'));
    }
    catch(error) {
      dispatch(fail(error));
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(request());

    await StorageService.unset('user');
    await StorageService.unset('token');

    dispatch({type: USER_LOGOUT});
  }
}