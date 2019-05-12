import React from 'react';
import {
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import Style from '../_utils/Style';
import { okAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchLogin } from '../_actions/UserActions';
import * as UserReducer from '../_reducers/UserReducer';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
        password: '',
      },
    }
  }

  _onEntrarButtonClick = () => {
    Keyboard.dismiss();

    if(!this.state.data.email) {
      okAlert('Por favor insira seu e-mail.');
    }
    else if(!this.state.data.password) {
      okAlert('Por favor insira sua senha.');
    }
    else {
      this.props.fetchLogin(this.state.data);
    }
  }

  _onCadastrarButtonClick = () => {
    this.props.navigation.navigate('Register');
  }

  componentDidMount() {
    this.props.fetchLogin(null);
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props != nextProps) {
      if(nextProps.userData != null) {
        this.props.navigation.navigate('Dashboard');
      }

      if((this.props.message != nextProps.message) && nextProps.message) {
        okAlert(nextProps.message);
      }
    }
  }

  render() {
    if(this.props.isLoading)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <View style={Style.formView}>
            <Image source={require('../_assets/icon.png')}/>
            <TextInput
              style={Style.formTextInput}
              placeholderTextColor='#fff'
              placeholder='E-MAIL'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, email: x } })}
              value={this.state.email}
            />
            <TextInput
              style={Style.formTextInput}
              secureTextEntry={true}
              placeholderTextColor='#fff'
              placeholder='SENHA'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, password: x } })}
              value={this.state.password}
            />
            <View style={Style.rowView}>
              <TouchableOpacity
                style={Style.borderedButton}
                onPress={this._onCadastrarButtonClick}
              >
                <Text style={Style.greenText}>CADASTRAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Style.greenButton}
                onPress={this._onEntrarButtonClick}
              >
                <Text style={Style.whiteText}>ENTRAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoading: UserReducer.isLoading(state),
  message: UserReducer.getMessage(state),
  userData: UserReducer.getUserData(state),
});

const mapDispatchToProps = dispatch => ({
  fetchLogin: (data) => dispatch(fetchLogin(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);