import { apiCallMiddleware } from "./middlewares/api-call"
import { promiseMiddleware } from "./middlewares/promise"
import advertisementReducer from "./reducers/advertisement"
import { composeWithDevTools } from 'remote-redux-devtools'
import { applyMiddleware, combineReducers, createStore } from "redux"

const appReducer = combineReducers({
  advertisement: advertisementReducer,
})

export default createStore(
  appReducer,
  {},
  composeWithDevTools(
    applyMiddleware(apiCallMiddleware, promiseMiddleware),
  )
)