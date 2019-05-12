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

import LoginScreen from './_screens/LoginScreen';
import RegisterScreen from './_screens/RegisterScreen';
import DashboardScreen from './_screens/DashboardScreen';
import MyAccountScreen from './_screens/MyAccountScreen';
import AddBillScreen from './_screens/AddBillScreen';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Dashboard: DashboardScreen,
    MyAccount: MyAccountScreen,
    AddBill: AddBillScreen,
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