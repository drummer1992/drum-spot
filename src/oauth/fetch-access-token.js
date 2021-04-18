import { AccessToken, LoginManager } from "react-native-fbsdk-next"

export const fetchAccessToken = async () => {
  const emptyResponse = { accessToken: null }

  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

    return result.isCancelled
      ? emptyResponse
      : await AccessToken.getCurrentAccessToken()
  } catch (e) {
    console.error(e)

    return emptyResponse
  }
}