import { Platform } from "react-native"
import { Color as c } from "../constants/app"

export const defaultNavigationOptions = {
  headerStyle    : {
    backgroundColor: Platform.select({
      android: c.primary,
      ios    : '#fff',
    })
  },
  headerTintColor: Platform.select({
    android: '#fff',
    ios    : c.primary,
  }),
}