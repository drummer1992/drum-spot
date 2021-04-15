import { reduceReducers } from "./helpers/reduce-reducers"
import { defaultInitialState, loadReducer } from "./helpers/load-reducer"
import { Type as t } from "../types"
import { getCollectionReducers } from "./helpers/collection-reducer"

const { initStateReducer, enrichStateReducer } = getCollectionReducers('id')

export default reduceReducers(
  { list: [], map: {}, ...defaultInitialState },
  loadReducer(t.CREATE_ADVERTISEMENT, enrichStateReducer),
  loadReducer(t.FETCH_ADVERTISEMENTS, initStateReducer),
)

export const selectAdvertisement = state => ({
  advertisements: Object.values(state.advertisement.map)
    .sort((a, b) => a > b ? 1 : -1),
  ...state.advertisement,
})