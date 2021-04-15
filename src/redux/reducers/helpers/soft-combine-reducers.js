export const softCombineReducers = reducers => (state = {}, action) => {
  const updates = {}

  for (const reducerKey of Object.keys(reducers)) {
    const nextStateForKey = reducers[reducerKey](state[reducerKey], action)

    if (nextStateForKey !== state[reducerKey]) {
      updates[reducerKey] = nextStateForKey
    }
  }

  return Object.keys(updates).length ? { ...state, ...updates } : state
}
