import createClient from "../../api/client"
import { discardUserToken } from "../actions/user"

let client

export const getClient = getState => {
  if (!client) {
    client = createClient('http://192.168.0.101:3000', getState().user.auth.token)
  }

  return client
}

export const apiCallMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { apiCall, ...rest } = action

    if (!apiCall) {
      return next(action)
    }

    const { api, context } = getClient(getState)

    return next({
      ...rest,
      promise: apiCall(api, context).catch((err) => {
        if (err.status === 401) {
          context.setUserToken(null)

          dispatch(discardUserToken())
        }

        throw err
      }),
    })
  }
}
