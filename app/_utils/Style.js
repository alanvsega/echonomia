import { Dimensions, StyleSheet } from 'react-native';

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
  dashboardView: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 15,
  },
  detailsView: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 15,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    flex: 1,
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightGreyView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    marginTop: 15,
    width: '90%',
    padding: 15,
    paddingTop: 0,
    borderRadius: 7,
  },
  listView: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightGrey,
    marginTop: 15,
    width: '90%',
    padding: 15,
    borderRadius: 7,
  },
  historyView: {
    width: '90%',
  },
  scrollContent: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  whiteText: {
    color: '#fff',
  },
  greenText: {
    color: COLORS.defaultGreen,
  },
  redText: {
    color: '#dc3545',
  },
  bigText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
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
    marginTop: 15,
    textAlign: 'center',
  },
  detailsLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 15,
  },
  formEditTextInput: {
    width: Dimensions.get('window').width-30,
    height: 45,
    backgroundColor: COLORS.lightGrey,
    color: '#fff',
    padding: 15,
    borderRadius: 7,
    marginLeft: 15,
  },
  formEditPicker: {
    width: Dimensions.get('window').width-30,
    backgroundColor: COLORS.lightGrey,
    color: '#fff',
    padding: 15,
    borderRadius: 7,
    marginLeft: 15,
  },
  formEditDatePicker: {
    width: Dimensions.get('window').width-30,
    height: 45,
    backgroundColor: COLORS.lightGrey,
    padding: 15,
    borderRadius: 7,
    marginLeft: 15,
  },
  moneyText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
});