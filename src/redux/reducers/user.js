import { reduceReducers } from "./helpers/reduce-reducers"
import { loadReducer } from "./helpers/load-reducer"
import { fulfilled, Type as t } from "../types"
import { softCombineReducers } from "./helpers/soft-combine-reducers"
import { createCollectionReducers } from "./helpers/collection-reducer"
import { reducersMap } from "./helpers/reducers-map"

const { initStateReducer, filterStateReducer, enrichStateReducer } = createCollectionReducers('_id')

const logout = () => ({
  auth: {
    loaded : true,
    loading: false,
  },
})

const signIn = (state, action) => ({
  auth: {
    ...state.auth,
    ...action.result,
  }
})

const putTokenFromStorage = (state, action) => ({
  ...state,
  token: action.token,
})

export default reduceReducers(
  {},
  loadReducer(t.FETCH_USER),
  reducersMap({
    [t.LOG_OUT_USER]           : logout,
    [fulfilled(t.SIGN_IN_USER)]: signIn,
  }),
  softCombineReducers({
    auth     : reduceReducers(
      {},
      loadReducer(t.SIGN_IN_USER),
      reducersMap({
        [t.FETCH_INITIAL_TOKEN]: putTokenFromStorage,
      })
    ),
    favorites: reduceReducers(
      {},
      loadReducer(t.ADD_TO_FAVORITES, enrichStateReducer),
      loadReducer(t.DELETE_FROM_FAVORITES, filterStateReducer),
      loadReducer(t.FETCH_FAVORITES, initStateReducer),
    )
  }),
)

export const selectUser = state => state.user
export const selectAuth = state => state.user.auth

export const selectFavoritesState = state => ({
  favorites: Object.values(state.user.favorites?.map || {}),
  ...state.user.favorites,
})