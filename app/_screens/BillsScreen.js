import React from 'react';
import {
  View,
  Text,
  ScrollView,
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

  componentDidMount() {
    this.props.fetchList();
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
                <View style={Style.listView} key={i}>
                  <Text style={[Style.whiteText, Style.bigText]}>{bill.month}/{bill.year}</Text>
                  <Text style={[Style.whiteText]}>{bill.totalValue}</Text>
                </View>
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