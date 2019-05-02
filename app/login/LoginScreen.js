import React from 'react';
import {
  Alert,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';

import Style from '../_utils/Style';
import LoginStyle from './LoginStyle';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  }

  _showAlert = (msg) => {
    Alert.alert(
      'Erro',
      msg,
      [
        {text: 'OK', onPress: () => {}},
      ],
      {cancelable: false},
    );
  }

  _onEntrarButtonClick = () => {
    if(this.state.username == '') {
      this._showAlert('Por favor preencha seu usuário.');
    }
    else if(this.state.password == '') {
      this._showAlert('Por favor preencha sua senha.');
    }
    else {
      Keyboard.dismiss();
      console.log('Logando.');
    }
  }

  _onCadastrarButtonClick = () => {

  }

  render() {
    return (
      <View style={Style.container}>
        <View style={LoginStyle.loginView}>
          <Image source={require('../_assets/icon.png')}/>
          <TextInput
            style={Style.formTextInput}
            placeholderTextColor='#fff'
            placeholder='USUÁRIO'
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <TextInput
            style={Style.formTextInput}
            placeholderTextColor='#fff'
            placeholder='SENHA'
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <View style={Style.rowView}>
            <TouchableOpacity
              style={Style.greenButton}
              onPress={this._onEntrarButtonClick}
            >
              <Text style={Style.whiteText}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.borderedButton}
              onPress={this._onCadastrarButtonClick}
            >
              <Text style={Style.greenText}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

