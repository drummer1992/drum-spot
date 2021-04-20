import React from "react"
import { Settings } from "react-native-fbsdk-next"

export const Bootstrap = ({ children }) => {
  Settings.initializeSDK()

  return children
}