import get from "lodash/get"

/**
 * @param {String} contextField
 * @param {Function} reducer
 * @param {Array.<String>} [actionTypes]
 */
export const contextReducer = (contextField, reducer, actionTypes) =>
  (state = {}, action) => {
    const context = get(action, contextField)
    const suitableAction =
      !actionTypes ||
      actionTypes.some((actionType) => {
        return actionType instanceof RegExp
          ? actionType.test(action.type)
          : action.type === actionType
      })

    if (context != null && suitableAction) {
      const newContextState = reducer(state[context], action)

      if (state[context] !== newContextState) {
        return {
          ...state,
          [context]: newContextState,
        }
      }
    }

    return state
  }
