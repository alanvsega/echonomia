import { Alert } from 'react-native';

export const okAlert = (msg = 'Algo deu errado.', title = 'Info') => {
  Alert.alert(
    title,
    msg,
    [
      { text: 'OK', onPress: () => {} },
    ],
    { cancelable: false },
  );
}