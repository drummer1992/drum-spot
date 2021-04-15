import { property, toArray } from "../../../utils/array"
import keyBy from "lodash/keyBy"

const enrich = context => (state, action) => ({
  ...state,
  list: state.list.concat(toArray(action.result).map(property(context))),
  map : {
    ...state.map,
    ...keyBy(toArray(action.result), context),
  }
})

const filter = context => (state, action) => {
  const byContext = item => item[context] === action.predicate

  const predicate = typeof action.predicate === 'string'
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

const init = context => (state, action) => ({
  ...state,
  list: action.result.map(property(context)),
  map : keyBy(action.result, context),
})

export const getCollectionReducers = context => {
  return {
    initStateReducer  : init(context),
    enrichStateReducer: enrich(context),
    filterStateReducer: filter(context),
  }
}