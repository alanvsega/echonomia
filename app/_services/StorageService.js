import { AsyncStorage } from "react-native"

export default class StorageService {
  static get = async (key) => {
    let authCache = await AsyncStorage.getItem('@'+key);
    return JSON.parse(authCache);
  }

  static set = async (key, data) => {
    await AsyncStorage.setItem('@'+key, JSON.stringify(data));
  }

  static unset = async (key) => {
    await AsyncStorage.removeItem('@'+key);
  }
}