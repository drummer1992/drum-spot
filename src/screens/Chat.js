import React from "react"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  default: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
  }
})

export const Chat = () => {
  return (
    <View style={styles.default}>
      <Text>Чат</Text>
    </View>
  )
}