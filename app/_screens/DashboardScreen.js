import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import Style from '../_utils/Style';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import * as UserReducer from '../_reducers/UserReducer';

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    if(this.props.userData == null)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <View style={Style.detailsView}>
            <Text style={Style.titleLabel}>Bem-vindo(a), {this.props.userData.name}</Text>
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