const resolve = (value) => {
  if (typeof value === "function") return value()

  return value
}

export const reducersMap = (reducerMap, initialState) =>
  (state, action) => {
    if (state === undefined) {
      state = resolve(initialState)
    }

    const reducer = reducerMap[action.type]

    return reducer ? reducer(state, action) : state
  }
