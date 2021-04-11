import React from "react"
import { View, StyleSheet } from 'react-native'

export const Container = ({ children, style }) => {
  return (
    <View style={{ ...styles.default, ...style }}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    flex  : 1,
    width : '100%',
    height: '100%',
  },
})