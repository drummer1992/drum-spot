import { reduceReducers } from "./helpers/reduce-reducers"
import { defaultInitialState, loadReducer } from "./helpers/load-reducer"
import { Type as t } from "../types"
import { createCollectionReducers } from "./helpers/collection-reducer"

const {
  initStateReducer,
  enrichStateReducer,
  updateStateReducer,
  filterStateReducer,
} = createCollectionReducers('_id')

const deletedImageReducer = (state, action) => {
  const advertisement = state.map[action._id]

  advertisement.images = advertisement.images.filter(img => img !== action.image)

  return {
    ...state, map: {
      ...state.map,
      [action._id]: advertisement,
    }
  }
}

const addImageReducer = (state, action) => {
  const advertisement = state.map[action._id]

  return {
    ...state, map: {
      ...state.map,
      [action._id]: {
        ...advertisement,
        images: advertisement.images.concat(action.result)
      },
    }
  }
}

export default reduceReducers(
  { list: [], map: {}, ...defaultInitialState },
  loadReducer(t.CREATE_ADVERTISEMENT, enrichStateReducer),
  loadReducer(t.UPDATE_ADVERTISEMENT, updateStateReducer),
  loadReducer(t.DELETE_ADVERTISEMENT, filterStateReducer),
  loadReducer(t.DELETE_ADVERTISEMENT_IMAGE, deletedImageReducer),
  loadReducer(t.ADD_ADVERTISEMENT_IMAGE, addImageReducer),
  loadReducer(t.FETCH_ADVERTISEMENTS, initStateReducer),
)

export const selectAdvertisements = state => ({
  advertisements: Object.values(state.advertisement.map)
    .sort((a, b) => a > b ? 1 : -1),
  ...state.advertisement,
})

export const selectAdvertisement = id => state => state.advertisement.map[id]