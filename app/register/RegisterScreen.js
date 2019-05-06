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
import DatePicker from 'react-native-datepicker'

import Style from '../_utils/Style';
import { errorAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchRegister } from './RegisterActions';
import * as UserReducer from '../_reducers/UserReducer';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: '',
        email: '',
        password: '',
        password2: '',
        birthDate: '',
      },
    }
  }

  _onCadastrarButtonClick = () => {
    Keyboard.dismiss();

    if(!this.state.data.name) {
      errorAlert('Por favor insira seu nome.');
    }
    else if(!this.state.data.email) {
      errorAlert('Por favor insira seu e-mail.');
    }
    else if(!this.state.data.birthDate) {
      errorAlert('Por favor insira sua data de nascimento.');
    }
    else if(!this.state.data.password || !this.state.data.password2) {
      errorAlert('Por favor insira sua senha.');
    }
    else if(this.state.data.password != this.state.data.password2) {
      errorAlert('Por favor confirme sua senha.');
    }
    else {
      this.props.fetchRegister(this.state.data);
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
              placeholder='NOME*'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, name: x } })}
              value={this.state.data.name}
            />
            <TextInput
              style={Style.formTextInput}
              placeholderTextColor='#fff'
              placeholder='E-MAIL*'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, email: x } })}
              value={this.state.data.email}
            />
            <DatePicker
              style={Style.formDatePicker}
              date={this.state.data.birthDate}
              mode='date'
              placeholder='DATA DE NASCIMENTO*'
              format='DD/MM/YYYY'
              minDate='01/01/1900'
              maxDate='01/01/2006'
              confirmBtnText='OK'
              cancelBtnText='Cancelar'
              customStyles={{
                dateIcon: {
                  display: 'none',
                },
                dateInput: {
                  borderWidth: 0,
                  marginLeft: 0,
                  marginTop: -24,
                },
                placeholderText: {
                  color: '#fff',
                  textAlign: 'left',
                },
                dateText: {
                  color: '#fff',
                },
              }}
              onDateChange={(date) => this.setState({ data: { ...this.state.data, birthDate: date } })}
            />
            <TextInput
              style={Style.formTextInput}
              secureTextEntry={true}
              placeholderTextColor='#fff'
              placeholder='SENHA*'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, password: x } })}
              value={this.state.data.password}
            />
            <TextInput
              style={Style.formTextInput}
              secureTextEntry={true}
              placeholderTextColor='#fff'
              placeholder='CONFIRME SUA SENHA'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, password2: x } })}
              value={this.state.data.password2}
            />
            <View style={Style.rowView}>
              <TouchableOpacity
                style={Style.greenButton}
                onPress={this._onCadastrarButtonClick}
              >
                <Text style={Style.whiteText}>CADASTRAR</Text>
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
});

const mapDispatchToProps = dispatch => ({
  fetchRegister: (data) => dispatch(fetchRegister(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);