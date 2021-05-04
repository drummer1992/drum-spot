import { apiCallMiddleware } from "./middlewares/api-call"
import { promiseMiddleware } from "./middlewares/promise"
import advertisementReducer from "./reducers/advertisement"
import userReducer from "./reducers/user"
import chatReducer from "./reducers/chat"
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'
import { applyMiddleware, combineReducers, createStore } from "redux"
import chat from './saga/chat'

const appReducer = combineReducers({
  advertisement: advertisementReducer,
  user         : userReducer,
  chat         : chatReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  appReducer,
  {},
  composeWithDevTools(
    applyMiddleware(
      apiCallMiddleware,
      promiseMiddleware,
      sagaMiddleware,
    ),
  )
)

sagaMiddleware.run(chat)

export default store