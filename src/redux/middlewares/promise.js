import { pending, fulfilled, rejected } from '../types'

export const promiseMiddleware = store => {
  return next => action => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState)
    }

    const { promise, type, ...rest } = action

    if (!promise) {
      return next(action)
    }

    next({ ...rest, type: pending(type) })

    let onThen
    let onCatch

    const thenable = action.promise
      .then(result => {
          next({ ...rest, payload: result, type: fulfilled(type) })

          return onThen && onThen(result)
        }
      )
      .catch(error => {
        console.error(error.stack)

        next({
          ...rest,
          error      : error.message,
          errorCode  : error.code,
          errorStatus: error.status,
          type       : rejected(type),
        })

        return onCatch && onCatch(error)
      })

    thenable.then = (onSuccessHandler, onErrorHandler) => {
      onThen = onSuccessHandler
      onCatch = onErrorHandler

      return thenable
    }

    thenable.catch = onErrorHandler => {
      onCatch = onErrorHandler

      return thenable
    }

    return thenable
  }
}
