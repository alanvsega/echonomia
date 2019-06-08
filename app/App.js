import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

import echonomia from './_reducers/Reducers';

import LoginScreen from './_screens/LoginScreen';
import RegisterScreen from './_screens/RegisterScreen';
import DashboardScreen from './_screens/DashboardScreen';
import MyAccountScreen from './_screens/MyAccountScreen';
import ActionsBillScreen from './_screens/ActionsBillScreen';
import TipsAndTricksScreen from './_screens/TipsAndTricksScreen';
import BillsScreen from './_screens/BillsScreen';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Dashboard: DashboardScreen,
    MyAccount: MyAccountScreen,
    ActionBill: ActionsBillScreen,
    TipsAndTricks: TipsAndTricksScreen,
    Bills: BillsScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

const store = createStore(
  echonomia,
  applyMiddleware(
    thunkMiddleware,
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