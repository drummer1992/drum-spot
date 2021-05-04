import { Alert } from "react-native"
import { Route as r } from "./constants/app"

export const alertDeleteAdvertisement = (name, onPress) => {
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

export const loginGuardAlert = (navigation, message) => Alert.alert(
  'Логін',
  message,
  [
    { text: 'Перейти на екран логіну', onPress: () => navigation.navigate(r.profile.name) },
    { text: 'Відміна' },
  ]
)