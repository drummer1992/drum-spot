import React from "react"
import { Text as NativeText, StyleSheet } from 'react-native'

export const RegularText = ({ style, ...props }) => (
  <NativeText style={{ ...styles.regular, ...style }} {...props}/>
)

export const BoldText = ({ style, ...props }) => (
  <NativeText style={{ ...styles.bold, ...style }} {...props}/>
)

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'roboto-regular'
  },
  bold   : {
    fontFamily: 'roboto-bold'
  },
})