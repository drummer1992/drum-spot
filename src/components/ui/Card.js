import { StyleSheet, View } from 'react-native'
import React from "react"

export const Card = ({ children, style }) => {
  return (
    <View style={{ ...styles.default, ...style }}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    marginHorizontal: 4,
    backgroundColor : '#fff',
    borderRadius    : 6,
    elevation       : 3,
    shadowOffset    : { width: 1, height: 1 },
    shadowColor     : '#333',
    shadowOpacity   : 0.3,
    shadowRadius    : 2,
  }
})