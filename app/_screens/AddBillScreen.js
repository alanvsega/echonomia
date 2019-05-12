import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import Style from '../_utils/Style';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

class AddBillScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        month: null,
        year: null,
        expenditure: null,
        flag: null,
        additionalGreen: null,
        additionalYellow: null,
        additionalRed: null,
        totalValue: null,
        totalTaxes: null,
        startReadDate: null,
        endReadDate: null,
      }
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <Header navigation={this.props.navigation}/>
        <View style={Style.detailsView}>
          <Text style={Style.titleLabel}>MÊS</Text>
          <TextInput
            style={Style.formEditTextInput}
            placeholderTextColor='#fff'
            placeholder=''
            onChangeText={(x) => {}}
            value={this.state.data.month}
          />
        </View>
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