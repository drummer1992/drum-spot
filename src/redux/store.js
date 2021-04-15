import { apiCallMiddleware } from "./middlewares/api-call"
import { promiseMiddleware } from "./middlewares/promise"
import advertisementReducer from "./reducers/advertisement"
import userReducer from "./reducers/user"
import { composeWithDevTools } from 'remote-redux-devtools'
import { applyMiddleware, combineReducers, createStore } from "redux"

const appReducer = combineReducers({
  advertisement: advertisementReducer,
  user         : userReducer
})

export default createStore(
  appReducer,
  {},
  composeWithDevTools(
    applyMiddleware(apiCallMiddleware, promiseMiddleware),
  )
)