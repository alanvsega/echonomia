import React from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';

import Style from '../_utils/Style';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <View style={Style.container}>
        <Header navigation={this.props.navigation}/>
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
)(DashboardScreen);