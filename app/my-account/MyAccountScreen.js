import React from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import Style from '../_utils/Style';

import Loader from '../_components/loader/Loader';
import Header from '../_components/header/Header';

import { logout } from '../login/LoginActions';
import * as UserReducer from '../_reducers/UserReducer';

class MyAccountScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  _onSairButtonClick = async () => {
    Alert.alert(
      'Saindo',
      'Deseja prosseguir?',
      [
        { text: 'Não', onPress: () => {} },
        { text: 'Sim', onPress: () => {
            this.props.logout();
            this.props.navigation.popToTop();
          }
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    if(this.props.userData == null)
      return <Loader/>;
    else {
      return (
        <View style={Style.container}>
          <Header navigation={this.props.navigation}/>
          <View style={Style.detailsView}>
            <Text style={Style.titleLabel}>E-MAIL</Text>
            <Text style={Style.detailsLabel}>{this.props.userData.user.email}</Text>
            <Text style={Style.titleLabel}>NOME</Text>
            <Text style={Style.detailsLabel}>{this.props.userData.user.name}</Text>
            <Text style={Style.titleLabel}>DATA DE NASCIMENTO</Text>
            <Text style={Style.detailsLabel}>{moment(this.props.userData.user.birthDate).format('DD/MM/YYYY')}</Text>
          </View>
            <View style={Style.formView}>
              <TouchableOpacity
                style={Style.greenButton}
                onPress={this._onSairButtonClick}
              >
                <Text style={Style.whiteText}>SAIR</Text>
              </TouchableOpacity>
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
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccountScreen);