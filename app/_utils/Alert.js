import { Alert } from 'react-native';

export const errorAlert = (msg) => {
  Alert.alert(
    'Erro',
    msg,
    [
      { text: 'OK', onPress: () => { } },
    ],
    { cancelable: false },
  );
}