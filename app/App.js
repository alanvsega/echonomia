import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import LoginScreen from './login/LoginScreen';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}