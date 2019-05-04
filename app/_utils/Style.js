import { StyleSheet } from 'react-native';

import { colors } from '../_constants/Colors';

export default Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultGrey,
  },
  formView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whiteText: {
    color: '#fff',
  },
  greenText: {
    color: colors.defaultGreen,
  },
  formTextInput: {
    width: '84%',
    height: 45,
    backgroundColor: colors.lightGrey,
    color: '#fff',
    padding: 15,
    marginTop: 15,
    borderRadius: 7,
  },
  formDatePicker: {
    width: '84%',
    height: 45,
    backgroundColor: colors.lightGrey,
    padding: 15,
    marginTop: 15,
    borderRadius: 7,
  },
  greenButton: {
    width: '42%',
    height: 45,
    alignItems: 'center',
    backgroundColor: colors.defaultGreen,
    padding: 15,
    marginTop: 15,
  },
  borderedButton: {
    width: '42%',
    height: 45,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.defaultGreen,
    padding: 15,
    marginTop: 15,
  },
});