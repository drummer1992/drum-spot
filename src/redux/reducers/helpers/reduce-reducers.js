const resolve = (value) => (typeof value == "function" ? value() : value)

export const reduceReducers = (initialState, ...reducers) => (
  state = resolve(initialState),
  action
) => {
  return reducers.reduce((s, reducer) => reducer(s, action), state)
}
