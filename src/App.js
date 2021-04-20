import React from 'react'
import { Navigation } from "./navigation/Navigation"
import { Provider } from 'react-redux'
import store from './redux/store'
import { Bootstrap } from "./Bootstrap"

export default function App() {
  return (
    <Bootstrap>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </Bootstrap>
  )
}
