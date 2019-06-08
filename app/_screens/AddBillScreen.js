import React from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown'
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import Style from '../_utils/Style';
import { okAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchCreate } from '../_actions/BillActions';
import * as BillReducer from '../_reducers/BillReducer';

class AddBillScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleStartReadDate: '',
      visibleEndReadDate: '',
      data: {},
    }
  }

  initData = () => {
    this.setState({
      data: {
        month: moment().month().toString(),
        year: moment().year().toString(),
        expenditure: null,
        flag: 'GREEN',
        totalValue: null,
        totalTaxes: null,
        additionalGreen: null,
        additionalYellow: null,
        additionalRed: null,
        startReadDate: null,
        endReadDate: null,
      }
    });
  }

  _onSalvarButtonClick = () => {
    Keyboard.dismiss();

    if(!this.state.data.month) {
      okAlert('Por favor insira o mês.');
    }
    else if(!this.state.data.year) {
      okAlert('Por favor insira o ano.');
    }
    else if(!this.state.data.expenditure || this.state.data.expenditure < 0) {
      okAlert('Por favor insira o consumo total.');
    }
    else if(!this.state.data.flag) {
      okAlert('Por favor insira a bandeira.');
    }
    else if(!this.state.data.totalValue || this.state.data.totalValue < 0) {
      okAlert('Por favor insira o valor total.');
    }
    else if(!this.state.data.totalTaxes || this.state.data.totalTaxes < 0) {
      okAlert('Por favor insira o total de impostos.');
    }
    else if(
      moment().year() < this.state.data.year ||
      (moment().year() == this.state.data.year && this.state.data.month > moment().month())
    ) {
      okAlert('Mês/ano de referência inválidos.');
    }
    else {
      this.props.fetchCreate(this.state.data);
      this.resetData();
    }
  }

  componentWillMount() {
    this.initData();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props != nextProps) {
      if((this.props.billMessage != nextProps.billMessage) && nextProps.billMessage) {
        okAlert(nextProps.billMessage);
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
          <ScrollView style={Style.scrollContent}>
            <Text style={Style.titleLabel}>Nova Conta</Text>
            <View style={Style.detailsView}>
              <Text style={Style.detailsLabel}>MÊS</Text>
              <Picker
                selectedValue={this.state.data.month}
                style={Style.formEditTextInput}
                onValueChange={(x) => this.setState({ data: { ...this.state.data, month: x } })}
              >
                <Picker.Item label="Janeiro" value="1"/>
                <Picker.Item label="Fevereiro" value="2"/>
                <Picker.Item label="Março" value="3"/>
                <Picker.Item label="Abril" value="4"/>
                <Picker.Item label="Maio" value="5"/>
                <Picker.Item label="Junho" value="6"/>
                <Picker.Item label="Julho" value="7"/>
                <Picker.Item label="Agosto" value="8"/>
                <Picker.Item label="Setembro" value="9"/>
                <Picker.Item label="Outubro" value="10"/>
                <Picker.Item label="Novembro" value="11"/>
                <Picker.Item label="Dezembro" value="12"/>
              </Picker>
              <Text style={Style.detailsLabel}>ANO</Text>
              <TextInput
                style={Style.formEditTextInput}
                placeholderTextColor='#fff'
                placeholder=''
                keyboardType='numeric'
                onChangeText={(x) => this.setState({ data: { ...this.state.data, year: x } })}
                value={this.state.data.year}
              />
              <Text style={Style.detailsLabel}>CONSUMO TOTAL</Text>
              <TextInput
                style={Style.formEditTextInput}
                placeholderTextColor='#fff'
                placeholder='KW/h'
                keyboardType='numeric'
                onChangeText={(x) => this.setState({ data: { ...this.state.data, expenditure: x } })}
                value={this.state.data.expenditure}
              />
              <Text style={Style.detailsLabel}>BANDEIRA DE CONSUMO</Text>
              <Picker
                selectedValue={this.state.data.flag}
                style={Style.formEditTextInput}
                onValueChange={(x) => this.setState({ data: { ...this.state.data, flag: x } })}
                mode="dialog"
              >
                <Picker.Item label="Verde" value="GREEN"/>
                <Picker.Item label="Amarela" value="YELLOW"/>
                <Picker.Item label="Vermelha" value="RED"/>
              </Picker>
              <Text style={Style.detailsLabel}>VALOR TOTAL</Text>
              <TextInput
                style={Style.formEditTextInput}
                placeholderTextColor='#fff'
                placeholder='R$'
                keyboardType='numeric'
                onChangeText={(x) => this.setState({ data: { ...this.state.data, totalValue: x } })}
                value={this.state.data.totalValue}
              />
              <Text style={Style.detailsLabel}>VALOR DOS IMPOSTOS</Text>
              <TextInput
                style={Style.formEditTextInput}
                placeholderTextColor='#fff'
                placeholder='R$'
                keyboardType='numeric'
                onChangeText={(x) => this.setState({ data: { ...this.state.data, totalTaxes: x } })}
                value={this.state.data.totalTaxes}
              />
              <Text style={Style.detailsLabel}>ADICIONAL DE BANDEIRA VERDE</Text>
              <TextInput
                style={Style.formEditTextInput}
                placeholderTextColor='#fff'
                placeholder='R$'
                keyboardType='numeric'
                onChangeText={(x) => this.setState({ data: { ...this.state.data, additionalGreen: x } })}
                value={this.state.data.additionalGreen}
              />
              <Text style={Style.detailsLabel}>ADICIONAL DE BANDEIRA AMARELA</Text>
              <TextInput
                style={Style.formEditTextInput}
                placeholderTextColor='#fff'
                placeholder='R$'
                keyboardType='numeric'
                onChangeText={(x) => this.setState({ data: { ...this.state.data, additionalYellow: x } })}
                value={this.state.data.additionalYellow}
              />
              <Text style={Style.detailsLabel}>ADICIONAL DE BANDEIRA VERMELHA</Text>
              <TextInput
                style={Style.formEditTextInput}
                placeholderTextColor='#fff'
                placeholder='R$'
                keyboardType='numeric'
                onChangeText={(x) => this.setState({ data: { ...this.state.data, additionalRed: x } })}
                value={this.state.data.additionalRed}
              />
              <Text style={Style.detailsLabel}>DATA DA LEITURA INICIAL</Text>
              <DatePicker
                style={Style.formEditDatePicker}
                date={this.state.visibleStartReadDate}
                mode='date'
                placeholder=''
                format='DD/MM/YYYY'
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
                  visibleStartReadDate: date,
                  data: { ...this.state.data, startReadDate: moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') }
                })}
              />
              <Text style={Style.detailsLabel}>DATA DA LEITURA FINAL</Text>
              <DatePicker
                style={Style.formEditDatePicker}
                date={this.state.visibleEndReadDate}
                editable={this.state.visibleStartReadDate ? true : false}
                mode='date'
                placeholder=''
                format='DD/MM/YYYY'
                minDate={this.state.visibleStartReadDate}
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
                  visibleEndReadDate: date,
                  data: { ...this.state.data, endReadDate: moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD') }
                })}
              />
              <View style={Style.buttonView}>
                <TouchableOpacity
                  style={Style.greenButton}
                  onPress={this._onSalvarButtonClick}
                >
                  <Text style={Style.whiteText}>SALVAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  isLoading: BillReducer.isLoading(state),
  billMessage: BillReducer.getMessage(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCreate: (data) => dispatch(fetchCreate(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBillScreen);