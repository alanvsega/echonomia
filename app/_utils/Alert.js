import { Alert } from 'react-native';

export const errorAlert = (msg = 'Algo deu errado.') => {
  Alert.alert(
    'Erro',
    msg,
    [
      { text: 'OK', onPress: () => {} },
    ],
    { cancelable: false },
  );
}