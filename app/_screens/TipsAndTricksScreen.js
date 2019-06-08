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

import { fetchList } from '../_actions/TipsAndTricksActions';
import * as TipsAndTricksReducer from '../_reducers/TipsAndTricksReducer';

class TipsAndTricksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    this.props.fetchList();
  }

  render() {
    if(this.props.tipIsLoading)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <ScrollView style={Style.scrollContent}>
            <View style={Style.dashboardView}>
              {this.props.tipsAndTricks != null && this.props.tipsAndTricks.map((tip, i) =>
                <View style={Style.tipsView} key={i}>
                  <Text style={[Style.whiteText, Style.bigText]}>{tip.title}</Text>
                  <Text style={[Style.whiteText]}>{tip.description}</Text>
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
  tipsAndTricks: TipsAndTricksReducer.getTipsAndTricks(state),
  tipIsLoading: TipsAndTricksReducer.isLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(fetchList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TipsAndTricksScreen);