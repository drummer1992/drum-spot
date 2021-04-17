import { property, toArray } from "../../../utils/array"
import keyBy from "lodash/keyBy"

const enrich = context => (state, action) => ({
  ...state,
  list: state.list.concat(toArray(action.payload).map(property(context))),
  map : {
    ...state.map,
    ...keyBy(toArray(action.payload), context),
  }
})

const filter = context => (state, action) => {
  const byContext = item => item[context] !== action.predicate

  const predicate = typeof action.predicate !== 'function'
    ? byContext
    : action.predicate

  const map = {}
  const list = []

  for (const item of Object.values(state.map)) {
    if (predicate(item)) {
      map[item[context]] = item

      list.push(item[context])
    }
  }

  return {
    ...state,
    list,
    map,
  }
}

const update = context => (state, action) => ({
  ...state,
  map: {
    ...state.map,
    [action[context]]: {
      ...state.map[action[context]],
      ...action.data,
    }
  },
})

const init = context => (state, action) => ({
  ...state,
  list: action.payload.map(property(context)),
  map : keyBy(action.payload, context),
})

export const createCollectionReducers = context => {
  return {
    initStateReducer  : init(context),
    enrichStateReducer: enrich(context),
    filterStateReducer: filter(context),
    updateStateReducer: update(context),
  }
}