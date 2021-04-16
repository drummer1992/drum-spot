import { Type as t } from "../types"

export const fetchProfile = ({ token }) => ({
  type   : t.FETCH_USER,
  apiCall: api => api.getProfile(token)
})

export const logOut = { type: t.LOG_OUT_USER }

export const signIn = {
  type   : t.SIGN_IN_USER,
  apiCall: api => api.signInByFb()
}