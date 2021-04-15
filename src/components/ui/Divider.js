import React from "react"
import { StyleSheet, View } from "react-native"
import { Color as c } from "../../constants/app"

export const Divider = () => (
  <View style={styles.default}/>
)

const styles = StyleSheet.create({
  default: {
    borderBottomWidth: 1,
    borderColor      : c.secondary,
  },
})