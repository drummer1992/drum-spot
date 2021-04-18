import React from 'react'
import { Navigation } from "./navigation/Navigation"
import { Provider } from 'react-redux'
import store from './redux/store'
import { Loader } from "./components/Loader"
import { Settings } from 'react-native-fbsdk-next'

export default function App() {
  Settings.initializeSDK()

  return (
    <Loader>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </Loader>
  )
}
