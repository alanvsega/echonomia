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
import { errorAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: {
        email: '',
        password: '',
      },
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
      console.log('Logando', this.state.data);
    }
  }

  _onCadastrarButtonClick = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    if(this.state.loading)
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
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);