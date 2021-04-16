import React from "react"
import { View, StyleSheet } from "react-native"
import { BoldText, RegularText } from "../../components/ui/Text"

const styles = StyleSheet.create({
  default: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
  }
})

export const About = () => {
  return (
    <View style={styles.default}>
      <RegularText>Цей додаток створив Варламов Андрій</RegularText>
      <BoldText>v1.0.0</BoldText>
    </View>
  )
}