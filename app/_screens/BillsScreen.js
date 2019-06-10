import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import Style from '../_utils/Style';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchList } from '../_actions/BillActions';
import * as BillReducer from '../_reducers/BillReducer';

class BillsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  getMonthName(m) {
    switch(m) {
      case 1: return 'Janeiro';
      case 2: return 'Fevereiro';
      case 3: return 'Março';
      case 4: return 'Abril';
      case 5: return 'Maio';
      case 6: return 'Junho';
      case 7: return 'Julho';
      case 8: return 'Agosto';
      case 9: return 'Setembro';
      case 10: return 'Outubro';
      case 11: return 'Novembro';
      case 12: return 'Dezembro';
    }
  }

  componentDidMount() {
    this.props.fetchList();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props != nextProps) {
      if((this.props.bills != nextProps.bills) && nextProps.bills == null) {
        this.props.fetchList();
      }
    }
  }

  render() {
    if(this.props.billIsLoading)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <ScrollView style={Style.scrollContent}>
            <View style={Style.dashboardView}>
              <Text style={Style.titleLabel}>Contas</Text>
              {this.props.bills != null && this.props.bills.map((bill, i) =>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ActionBill', { bill: bill })} key={i}>
                  <View style={Style.listView}>
                    <Text style={[Style.whiteText, Style.bigText]}>{this.getMonthName(bill.month)} de {bill.year}</Text>
                    <Text style={[Style.whiteText]}>R$ {bill.totalValue} | {bill.expenditure} kWh</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  bills: BillReducer.getBills(state),
  billIsLoading: BillReducer.isLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillsScreen);