import React from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import Style from '../_utils/Style';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

class AddBillScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleStartReadDate: '',
      visibleEndReadDate: '',
      data: {
        month: moment().month().toString(),
        year: moment().year().toString(),
        expenditure: null,
        flag: null,
        totalValue: null,
        totalTaxes: null,
        additionalGreen: null,
        additionalYellow: null,
        additionalRed: null,
        startReadDate: null,
        endReadDate: null,
      }
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <Header navigation={this.props.navigation}/>
        <ScrollView style={Style.scrollContent}>
          <View style={Style.detailsView}>
            <Text style={Style.titleLabel}>MÊS</Text>
            <Picker
              selectedValue={this.state.data.month}
              style={Style.formEditTextInput}
            >
              <Picker.Item label="Janeiro" value="0"/>
              <Picker.Item label="Fevereiro" value="1"/>
              <Picker.Item label="Março" value="2"/>
              <Picker.Item label="Abril" value="3"/>
              <Picker.Item label="Maio" value="4"/>
              <Picker.Item label="Junho" value="5"/>
              <Picker.Item label="Julho" value="6"/>
              <Picker.Item label="Agosto" value="7"/>
              <Picker.Item label="Setembro" value="8"/>
              <Picker.Item label="Outubro" value="9"/>
              <Picker.Item label="Novembro" value="10"/>
              <Picker.Item label="Dezembro" value="11"/>
            </Picker>
            <Text style={Style.titleLabel}>ANO</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder=''
              keyboardType='numeric'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, year: x } })}
              value={this.state.data.year}
            />
            <Text style={Style.titleLabel}>CONSUMO TOTAL</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='KW/h'
              keyboardType='numeric'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, expenditure: x } })}
              value={this.state.data.expenditure}
            />
            <Text style={Style.titleLabel}>BANDEIRA DE CONSUMO</Text>
            <Text style={Style.titleLabel}>VALOR TOTAL</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='R$'
              keyboardType='numeric'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, totalValue: x } })}
              value={this.state.data.totalValue}
            />
            <Text style={Style.titleLabel}>VALOR DOS IMPOSTOS</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='R$'
              keyboardType='numeric'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, totalTaxes: x } })}
              value={this.state.data.totalTaxes}
            />
            <Text style={Style.titleLabel}>ADICIONAL DE BANDEIRA VERDE</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='R$'
              keyboardType='numeric'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, additionalGreen: x } })}
              value={this.state.data.additionalGreen}
            />
            <Text style={Style.titleLabel}>ADICIONAL DE BANDEIRA AMARELA</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='R$'
              keyboardType='numeric'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, additionalYellow: x } })}
              value={this.state.data.additionalYellow}
            />
            <Text style={Style.titleLabel}>ADICIONAL DE BANDEIRA VERMELHA</Text>
            <TextInput
              style={Style.formEditTextInput}
              placeholderTextColor='#fff'
              placeholder='R$'
              keyboardType='numeric'
              onChangeText={(x) => this.setState({ data: { ...this.state.data, additionalRed: x } })}
              value={this.state.data.additionalRed}
            />
            <Text style={Style.titleLabel}>DATA DA LEITURA INICIAL</Text>
            <DatePicker
              style={Style.formEditDatePicker}
              date={this.state.visibleStartReadDate}
              mode='date'
              placeholder=''
              format='DD/MM/YYYY'
              minDate='01/04/2019'
              maxDate='31/05/2019'
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
            <Text style={Style.titleLabel}>DATA DA LEITURA FINAL</Text>
            <DatePicker
              style={Style.formEditDatePicker}
              date={this.state.visibleEndReadDate}
              mode='date'
              placeholder=''
              format='DD/MM/YYYY'
              minDate='01/04/2019'
              maxDate='31/05/2019'
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBillScreen);