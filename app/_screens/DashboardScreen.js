import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';

import Style from '../_utils/Style';
import { okAlert } from '../_utils/Alert';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { fetchRandomTip } from '../_actions/TipsAndTricksActions';
import * as UserReducer from '../_reducers/UserReducer';
import * as TipsAndTricksReducer from '../_reducers/TipsAndTricksReducer';

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.props.fetchRandomTip();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props != nextProps) {
      if((this.props.tipMessage != nextProps.tipMessage) && nextProps.tipMessage) {
        okAlert(nextProps.tipMessage);
      }
    }
  }

  render() {
    if(!this.props.userData || this.props.tipIsLoading)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <View style={Style.dashboardView}>
            <Text style={Style.titleLabel}>Bem-vindo(a), {this.props.userData.name}</Text>

            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Bills')}>
              <View style={Style.lightGreyView}>
                <Text style={Style.titleLabel}>Histórico</Text>
              </View>
            </TouchableWithoutFeedback>

            <View style={Style.lightGreyView}>
              <Text style={Style.titleLabel}>Economia</Text>
              <Text style={[Style.greenText, Style.moneyText]}>R$ 17,00</Text>
              <Text style={Style.whiteText}>Janeiro</Text>
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
  tipMessage: TipsAndTricksReducer.getMessage(state),
  tipIsLoading: TipsAndTricksReducer.isLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchRandomTip: () => dispatch(fetchRandomTip()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);