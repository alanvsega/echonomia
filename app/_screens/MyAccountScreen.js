import React from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import Style from '../_utils/Style';
import { okAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { logout, fetchUpdate } from '../_actions/UserActions';
import * as UserReducer from '../_reducers/UserReducer';

class MyAccountScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleBirthDate: '',
      data: {
        email: '',
        name: '',
        birthDate: '',
        password: '',
        password2: '',
      }
    }
  }

  _onSairButtonClick = async () => {
    Alert.alert(
      'Saindo',
      'Deseja prosseguir?',
      [
        { text: 'Não', onPress: () => {} },
        {
          text: 'Sim', onPress: () => {
            this.props.logout();
            this.props.navigation.popToTop();
          }
        },
      ],
      { cancelable: false },
    );
  }

  _onSalvarButtonClick = () => {
    Keyboard.dismiss();

    if(!this.state.data.email) {
      okAlert('Por favor insira seu e-mail.');
    }
    else if(!this.state.data.name) {
      okAlert('Por favor insira seu nome.');
    }
    else if(!this.state.data.birthDate) {
      okAlert('Por favor insira sua data de nascimento.');
    }
    else if(this.state.data.password && this.state.data.password2 && (this.state.data.password !== this.state.data.password2)) {
      okAlert('Alteração de senha inválida.');
    }
    else {
      this.props.fetchUpdate(this.state.data);
    }
  }

  componentDidMount() {
    this.setState({
      visibleBirthDate: moment.utc(this.props.userData.birthDate).format('DD/MM/YYYY'),
      data: {
        ...this.state.data,
        email: this.props.userData.email,
        name: this.props.userData.name,
        birthDate: moment.utc(this.props.userData.birthDate).format('YYYY-MM-DD'),
      }
    });
  }

  render() {
    if(this.props.userData == null)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <View style={Style.detailsView}>
            <Text style={Style.titleLabel}>E-MAIL</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='E-MAIL*'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, email: x } })}
              value={this.state.data.email}
            />
            <Text style={Style.titleLabel}>NOME</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='NOME*'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, name: x } })}
              value={this.state.data.name}
            />
            <Text style={Style.titleLabel}>DATA DE NASCIMENTO</Text>
            <DatePicker
              style={Style.formEditDatePicker}
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
            <Text style={Style.titleLabel}>NOVA SENHA</Text>
            <TextInput
              style={Style.formEditTextInput}
              secureTextEntry={true}
              placeholderTextColor='#fff'
              placeholder=''
              onChangeText={(x) => this.setState({ data: { ...this.state.data, password: x } })}
              value={this.state.data.password}
            />
            <Text style={Style.titleLabel}>CONFIRMAÇÃO</Text>
            <TextInput
              style={Style.formEditTextInput}
              secureTextEntry={true}
              placeholderTextColor='#fff'
              placeholder=''
              onChangeText={(x) => this.setState({ data: { ...this.state.data, password2: x } })}
              value={this.state.data.password2}
            />
            <View style={Style.buttonView}>
              <TouchableOpacity
                style={Style.borderedButton}
                onPress={this._onSairButtonClick}
              >
                <Text style={Style.whiteText}>SAIR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Style.greenButton}
                onPress={this._onSalvarButtonClick}
              >
                <Text style={Style.whiteText}>SALVAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  userData: UserReducer.getUserData(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchUpdate: (data) => dispatch(fetchUpdate(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccountScreen);