import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';

import echonomia from './_reducers/Reducers';

import LoginScreen from './login/LoginScreen';
import RegisterScreen from './register/RegisterScreen';
import DashboardScreen from './dashboard/DashboardScreen';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Dashboard: DashboardScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

const loggerMiddleware = createLogger();

const store = createStore(
  echonomia,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}