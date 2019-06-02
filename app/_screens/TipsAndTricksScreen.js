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

class TipsAndTricksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    if(false)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <ScrollView style={Style.scrollContent}>
            <View style={Style.dashboardView}>
              <View style={Style.tipsView}>
                <Text style={[Style.whiteText, Style.bigText]}>Uma média de 10 minutos no banho é suficiente! ;)</Text>
              </View>
              <View style={Style.tipsView}>
                <Text style={[Style.whiteText, Style.bigText]}>Dica 1</Text>
              </View>
              <View style={Style.tipsView}>
                <Text style={[Style.whiteText, Style.bigText]}>Dica 2</Text>
              </View>
              <View style={Style.tipsView}>
                <Text style={[Style.whiteText, Style.bigText]}>Dica 3</Text>
              </View>
              <View style={Style.tipsView}>
                <Text style={[Style.whiteText, Style.bigText]}>Dica 4</Text>
              </View>
              <View style={Style.tipsView}>
                <Text style={[Style.whiteText, Style.bigText]}>Dica 5</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TipsAndTricksScreen);