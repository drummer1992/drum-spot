import { reduceReducers } from "./helpers/reduce-reducers"
import { loadReducer } from "./helpers/load-reducer"
import { Type as t } from "../types"
import { softCombineReducers } from "./helpers/soft-combine-reducers"
import { reducersMap } from "./helpers/reducers-map"

const logout = () => ({
  auth: {
    loaded : true,
    loading: false,
  },
})

export default reduceReducers(
  {},
  loadReducer(t.FETCH_USER),
  reducersMap({ [t.LOG_OUT_USER]: logout }),
  softCombineReducers({
    auth: loadReducer(t.SIGN_IN_USER)
  }),
)

export const selectUser = state => state.user
export const selectAuth = state => state.user.auth