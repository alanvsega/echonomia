import React from 'react';
import {
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Text,
} from 'react-native';

import Style from '../_utils/Style';
import { errorAlert } from '../_utils/Alert';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  _onEntrarButtonClick = () => {
    Keyboard.dismiss();

    if(this.state.email == '') {
      errorAlert('Por favor insira seu e-mail.');
    }
    else if(this.state.password == '') {
      errorAlert('Por favor insira sua senha.');
    }
    else {
      console.log('Logando', this.state.email, this.state.password);
    }
  }

  _onCadastrarButtonClick = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={Style.container}>
        <View style={Style.formView}>
          <Image source={require('../_assets/icon.png')}/>
          <TextInput
            style={Style.formTextInput}
            placeholderTextColor='#fff'
            placeholder='E-MAIL'
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            style={Style.formTextInput}
            secureTextEntry={true}
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

