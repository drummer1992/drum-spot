import { Alert } from "react-native"

export const handleDeleteEntity = (name, onPress) => {
  Alert.alert(
    'Видалення',
    `Ви дійсно хочете видалити публікацію '${name}'?`,
    [
      { text: 'Видалити', onPress, style: 'destructive' },
      { text: 'Закрити', style: 'cancel' },
    ],
    { cancelable: true },
  )
}