import React from "react"
import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  default: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
  }
})

export const Favorites = () => {
  return (
    <View style={styles.default}>
      <Text>Вибране</Text>
    </View>
  )
}