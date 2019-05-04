import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import LoginScreen from './login/LoginScreen';
import RegisterScreen from './register/RegisterScreen';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}