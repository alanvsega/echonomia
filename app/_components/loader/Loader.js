import React from 'react';
import {
  View,
  Image,
} from 'react-native';

import LoaderStyle from './LoaderStyle';

export default class Loader extends React.Component {
  render() {
    return (
      <View style={LoaderStyle.fullPage}>
        <Image source={require('../../_assets/loading.gif')}/>
      </View>
    );
  }
}