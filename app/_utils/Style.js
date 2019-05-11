import { StyleSheet } from 'react-native';

import { COLORS } from '../_constants/Colors';

export default Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.defaultGrey,
  },
  formView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsView: {
    flex: 1,
    alignItems: 'flex-start',
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
    color: COLORS.defaultGreen,
  },
  formTextInput: {
    width: '84%',
    height: 45,
    backgroundColor: COLORS.lightGrey,
    color: '#fff',
    padding: 15,
    marginTop: 15,
    borderRadius: 7,
  },
  formDatePicker: {
    width: '84%',
    height: 45,
    backgroundColor: COLORS.lightGrey,
    padding: 15,
    marginTop: 15,
    borderRadius: 7,
  },
  greenButton: {
    width: '42%',
    height: 45,
    alignItems: 'center',
    backgroundColor: COLORS.defaultGreen,
    padding: 15,
    marginTop: 15,
  },
  borderedButton: {
    width: '42%',
    height: 45,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.defaultGreen,
    padding: 15,
    marginTop: 15,
  },
  titleLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
    marginTop: 15,
  },
  detailsLabel: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
  },
});