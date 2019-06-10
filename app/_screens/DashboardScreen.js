import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import PureChart from 'react-native-pure-chart';

import Style from '../_utils/Style';
import { okAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchRandomTip } from '../_actions/TipsAndTricksActions';
import { fetchMonthEconomy, fetchChart } from '../_actions/BillActions';
import * as UserReducer from '../_reducers/UserReducer';
import * as TipsAndTricksReducer from '../_reducers/TipsAndTricksReducer';
import * as BillReducer from '../_reducers/BillReducer';

class DashboardScreen extends React.Component {
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
    this.props.fetchRandomTip();
    this.props.fetchMonthEconomy();
    this.props.fetchChart();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props != nextProps) {
      if((this.props.tipMessage != nextProps.tipMessage) && nextProps.tipMessage) {
        okAlert(nextProps.tipMessage);
      }

      if((this.props.monthEconomy != nextProps.monthEconomy) && nextProps.monthEconomy == null) {
        this.props.fetchMonthEconomy();
      }

      if((this.props.chart != nextProps.chart) && nextProps.chart == null) {
        this.props.fetchChart();
      }
    }
  }

  render() {
    if(!this.props.userData || this.props.tipIsLoading)
      return <Loader/>;
    else {
      let chartData = [];

      this.props.chart != null && this.props.chart.map((c, i) => {
        chartData.push({
          x: c.month + '/' + c.year,
          y: c.expenditure
        })
      });

      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <View style={Style.dashboardView}>
            <Text style={Style.titleLabel}>Bem-vindo(a), {this.props.userData.name}</Text>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Bills')}>
              <View style={Style.historyView}>
                <Text style={Style.titleLabel}>Histórico</Text>
                <PureChart data={chartData} type='line'/>
              </View>
            </TouchableWithoutFeedback>

            <View style={Style.lightGreyView}>
              <Text style={Style.titleLabel}>Economia</Text>
              <Text
                style=
                {
                  this.props.monthEconomy
                  ? this.props.monthEconomy.totalEconomy < 0
                    ? [Style.redText, Style.moneyText]
                    : [Style.greenText, Style.moneyText]
                  : [Style.greenText, Style.moneyText]
                }
              >
                R$ {this.props.monthEconomy ? this.props.monthEconomy.totalEconomy : '0'}
              </Text>
              <Text style={Style.whiteText}>{this.props.monthEconomy ? this.getMonthName(this.props.monthEconomy.relatedMonth) : '-'}</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('TipsAndTricks')}>
              <View style={Style.lightGreyView}>
                <Text style={Style.titleLabel}>{this.props.tip ? this.props.tip.title : 'Dica'}</Text>
                <Text style={Style.whiteText}>{this.props.tip ? this.props.tip.description : 'Oops :('}</Text>
                <Text> </Text>
              </View>
            </TouchableWithoutFeedback>

            <ActionButton
              buttonColor="#4CAF50"
              onPress={() => this.props.navigation.navigate('ActionBill')}
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  userData: UserReducer.getUserData(state),
  tip: TipsAndTricksReducer.getTip(state),
  monthEconomy: BillReducer.getMonthEconomy(state),
  chart: BillReducer.getChart(state),
  tipMessage: TipsAndTricksReducer.getMessage(state),
  tipIsLoading: TipsAndTricksReducer.isLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchRandomTip: () => dispatch(fetchRandomTip()),
  fetchMonthEconomy: () => dispatch(fetchMonthEconomy()),
  fetchChart: () => dispatch(fetchChart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);