import { Type as t } from "../types"

export const fetchProfile = ({ token }) => ({
  type: t.FETCH_USER,
  apiCall: api => api.getProfile(token)
})

export const signIn = () => dispatch => ({
  type: t.SIGN_IN_USER,
  apiCall: async api => {
    const response = await api.signInByFb()

    alert(JSON.stringify(response))

    dispatch(fetchProfile(response))

    return response
  }
})