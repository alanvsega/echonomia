import { StyleSheet } from 'react-native';

export default Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313131',
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
    color: '#71d004',
  },
  formTextInput: {
    width: '84%',
    height: 45,
    backgroundColor: '#888',
    color: '#fff',
    padding: 15,
    marginTop: 15,
    borderRadius: 7,
  },
  greenButton: {
    width: '42%',
    height: 45,
    alignItems: 'center',
    backgroundColor: '#71d004',
    padding: 15,
    marginTop: 15,
  },
  borderedButton: {
    width: '42%',
    height: 45,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#71d004',
    padding: 15,
    marginTop: 15,
  },
});