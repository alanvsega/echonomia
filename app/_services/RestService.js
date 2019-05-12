import { create } from 'axios';

import StorageService from './StorageService';

import { API_ENDPOINT } from '../_constants/Properties';

const axios = create({
  timeout: 30000,
  validateStatus: false,
});

export default class RestService {
  static request = async (method, uri, data = {}, headers = {}) => {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    let url = API_ENDPOINT + uri;
    let requestData = {
      method,
      url,
      headers,
    };

    if (method !== 'get') {
      requestData.data = data;
    }

    console.log('Requesting:', url);
    let response = await axios(requestData);
    
    return response;
  }

  static get = async (uri) => {
    return RestService.request('get', uri);
  }

  static post = async (uri, data) => {
    return RestService.request('post', uri, data);
  }

  static headerWithAuthorization = async (header = {}) => {
    let token = await StorageService.get('token');

    if (token) {
      header.Authorization = 'Bearer ' + token;
    }

    return header;
  }

  static getAuthenticated = async (uri, header) => {
    header = await RestService.headerWithAuthorization(header);
    return RestService.request('get', uri, {}, header);
  }

  static postAuthenticated = async (uri, data, header) => {
    header = await RestService.headerWithAuthorization(header);
    return RestService.request('post', uri, data, header);
  }

  static patchAuthenticated = async (uri, data, header) => {
    header = await RestService.headerWithAuthorization(header);
    return RestService.request('patch', uri, data, header);
  }
}