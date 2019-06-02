import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';

import Style from '../_utils/Style';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import * as UserReducer from '../_reducers/UserReducer';

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  _onDicasClick = () => {
    this.props.navigation.navigate('TipsAndTricks');
  }

  render() {
    if(this.props.userData == null)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <View style={Style.dashboardView}>
            <Text style={Style.titleLabel}>Bem-vindo(a), {this.props.userData.name}</Text>

            <View style={Style.lightGreyView}>
              <Text style={Style.titleLabel}>Histórico</Text>
            </View>

            <View style={Style.lightGreyView}>
              <Text style={Style.titleLabel}>Economia</Text>
              <Text style={[Style.greenText, Style.moneyText]}>R$ 17,00</Text>
              <Text style={Style.whiteText}>Janeiro</Text>
            </View>

            <TouchableWithoutFeedback onPress={() => this._onDicasClick()}>
              <View style={Style.lightGreyView}>
                <Text style={Style.titleLabel}>Dica</Text>
                <Text style={Style.whiteText}>Uma média de 10 minutos no banho é suficiente! ;)</Text>
              </View>
            </TouchableWithoutFeedback>

            <ActionButton
              buttonColor="#4CAF50"
              onPress={() => { this.props.navigation.navigate('AddBill'); }}
            />
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);