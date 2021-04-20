import AsyncStorage from '@react-native-async-storage/async-storage'

export const TOKEN_KEY = 'userToken'

let userToken

export const setToken = async token => {
  userToken = token

  await AsyncStorage.setItem(TOKEN_KEY, token || '')
}

export const getToken = async () => {
  if (userToken) {
    return userToken
  }

  const token = await AsyncStorage.getItem(TOKEN_KEY)

  userToken = token

  return token
}