import { rejected, Type as t } from "../types"

export const fetchProfile = () => ({
  type   : t.FETCH_USER,
  apiCall: api => api.getProfile()
})

export const logOut = { type: t.LOG_OUT_USER }

export const signIn = accessToken => ({
  type   : t.SIGN_IN_USER,
  apiCall: async (api, context) => {
    const response = await api.signInByFb(accessToken)

    context.setUserToken(response.token)

    return response
  }
})

export const discardUserToken = () => (dispatch, getState) => {
  const { token } = getState().user.auth

  if (token) {
    // remove token from mysqlLite
    dispatch(logOut)
    dispatch({
      type : rejected(t.SIGN_IN_USER),
      error: 'The session has expired, please login again',
    })
  }
}
