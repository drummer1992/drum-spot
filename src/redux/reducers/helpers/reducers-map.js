import produce from 'immer'

const resolve = (value) => {
  if (typeof value === "function") return value()

  return value
}

export const reducersMap = (reducerMap, initialState = {}) =>
  (state, action) => {
    if (state === undefined) {
      state = resolve(initialState)
    }

    return produce(state, draft => {
      const reducer = reducerMap[action.type]

      return reducer ? reducer(draft, action) : draft
    })
  }
