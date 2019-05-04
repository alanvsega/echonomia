import { StyleSheet } from 'react-native';

import { colors } from '../../_constants/Colors'

export default HeaderStyle = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#000',
    height: 75,
  },
  logoView: {
    marginTop: 25,
  },
  logo: {
    color: colors.defaultGreen,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  backIconView: {
    marginTop: 28,
    marginLeft: 10,
  },
  backIcon: {
    color: colors.lightGrey,
  },
  userIconView: {
    marginTop: 28,
    marginRight: 10,
  },
  userIcon: {
    color: colors.lightGrey,
  },
});