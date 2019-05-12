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
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import Style from '../_utils/Style';
import { okAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchRegister } from '../_actions/UserActions';
import * as UserReducer from '../_reducers/UserReducer';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleBirthDate: '01/01/2001',
      data: {
        name: '',
        email: '',
        password: '',
        password2: '',
        birthDate: '2001-01-01',
      },
    }
  }

  _onCadastrarButtonClick = () => {
    Keyboard.dismiss();

    if(!this.state.data.name) {
      okAlert('Por favor insira seu nome.');
    }
    else if(!this.state.data.email) {
      okAlert('Por favor insira seu e-mail.');
    }
    else if(!this.state.data.birthDate) {
      okAlert('Por favor insira sua data de nascimento.');
    }
    else if(!this.state.data.password || !this.state.data.password2) {
      okAlert('Por favor insira sua senha.');
    }
    else if(this.state.data.password != this.state.data.password2) {
      okAlert('Por favor confirme sua senha.');
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
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, email: x } })}
              value={this.state.data.email}
            />
            <DatePicker
              style={Style.formDatePicker}
              date={this.state.visibleBirthDate}
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
                  alignSelf: 'flex-start',
                  color: '#fff',
                },
                dateText: {
                  alignSelf: 'flex-start',
                  color: '#fff',
                },
              }}
              onDateChange={(date) => this.setState({
                visibleBirthDate: date,
                data: { ...this.state.data, birthDate: moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') }
              })}
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