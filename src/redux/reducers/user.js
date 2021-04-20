import { reduceReducers } from "./helpers/reduce-reducers"
import { loadReducer } from "./helpers/load-reducer"
import { fulfilled, Type as t } from "../types"
import { softCombineReducers } from "./helpers/soft-combine-reducers"
import { reducersMap } from "./helpers/reducers-map"

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
    [t.LOG_OUT_USER]: logout,
    [fulfilled(t.SIGN_IN_USER)]: signIn,
  }),
  softCombineReducers({
    auth: reduceReducers(
      {},
      loadReducer(t.SIGN_IN_USER),
      reducersMap({
        [t.FETCH_INITIAL_TOKEN]: putTokenFromStorage,
      })
    )
  }),
)

export const selectUser = state => state.user
export const selectAuth = state => state.user.auth