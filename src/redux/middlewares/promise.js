import { pending, fulfilled, rejected } from '../types'

export const promiseMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, type, ...rest } = action

    if (!promise) {
      return next(action)
    }

    next({ ...rest, type: pending(type) })

    return action.promise.then(
      result => next({ ...rest, payload: result, type: fulfilled(type) }),
      err => {
        console.error(err.stack || err)

        next({
          ...rest,
          error      : err.message,
          errorCode  : err.code,
          errorStatus: err.status,
          type       : rejected(type),
        })

        return err
      }
    )
  }
}
