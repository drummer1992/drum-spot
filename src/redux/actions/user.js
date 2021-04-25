import { rejected, Type as t } from "../types"
import { setToken } from "../../storage"

export const fetchProfile = () => ({
  type   : t.FETCH_USER,
  apiCall: api => api.getProfile()
})

export const logOut = () => async dispatch => {
  await setToken(null)

  dispatch({ type: t.LOG_OUT_USER })
}

export const signIn = accessToken => ({
  type   : t.SIGN_IN_USER,
  apiCall: async (api, context) => {
    const response = await api.signInByFb(accessToken)

    context.setUserToken(response.token)

    await setToken(response.token)

    return response
  }
})

export const discardUserToken = () => (dispatch, getState) => {
  const { token } = getState().user.auth

  if (token) {
    dispatch(logOut())
    dispatch({
      type : rejected(t.SIGN_IN_USER),
      error: 'The session has expired, please login again',
    })
  }
}

export const addToFavorites = id => ({
  id,
  type   : t.ADD_TO_FAVORITES,
  apiCall: api => api.addToFavorites(id)
})

export const fetchFavorites = () => ({
  type   : t.FETCH_FAVORITES,
  apiCall: api => api.getFavorites()
})

export const deleteFromFavorites = id => ({
  predicate: id,
  type     : t.DELETE_FROM_FAVORITES,
  apiCall  : api => api.deleteFromFavorites(id)
})
