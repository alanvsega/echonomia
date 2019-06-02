import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'expo';
import { StackActions } from 'react-navigation';

import HeaderStyle from './HeaderStyle';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showBackIcon: false,
      showUserIcon: false,
    }
  }

  _onBackButtonClick = () => {
    const popAction = StackActions.pop({
      n: 1,
    });
    
    this.props.navigation.dispatch(popAction);
  }

  _onPerfilButtonClick = () => {
    this.props.navigation.navigate('MyAccount');
  }

  componentWillMount = () => {
    if(this.props.navigation.state.routeName == 'Register' || 
      this.props.navigation.state.routeName == 'MyAccount') {
      this.setState({ showBackIcon: true });
    }
    else if(this.props.navigation.state.routeName == 'Dashboard') {
      this.setState({
        showBackIcon: false,
        showUserIcon: true,
      });
    }
    else if(this.props.navigation.state.routeName != 'Login') {
      this.setState({
        showBackIcon: true,
        showUserIcon: true,
      });
    }
  }

  render() {
    return (
      <View style={HeaderStyle.topBar}>
        <View style={HeaderStyle.backIconView}>
          {this.state.showBackIcon &&
            <TouchableOpacity
              onPress={() => this._onBackButtonClick() }
            >
              <Icon.Ionicons
                name='md-arrow-back'
                size={30}
                style={HeaderStyle.backIcon}
              />
            </TouchableOpacity>
          }
        </View>
        <View style={HeaderStyle.logoView}>
          <Text style={HeaderStyle.logo}>echonomia</Text>
        </View>
        <View style={HeaderStyle.userIconView}>
          {this.state.showUserIcon &&
            <TouchableOpacity
              onPress={() => this._onPerfilButtonClick() }
            >
              <Icon.FontAwesome
                name='user-circle'
                size={30}
                style={HeaderStyle.userIcon}
              />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}