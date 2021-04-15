import { DrumSpotAPI } from "../../api/drum-spot"

export const apiCallMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { apiCall, ...rest } = action

    if (!apiCall) {
      return next(action)
    }

    return next({
      ...rest,
      promise: apiCall(DrumSpotAPI),
    })
  }
}
