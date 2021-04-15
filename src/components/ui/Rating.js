import { View, StyleSheet, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Color as c } from "../../constants/app"
import React from "react"
import identity from 'lodash/identity'

const styles = StyleSheet.create({
  default: {
    height        : 50,
    alignItems    : 'center',
    justifyContent: 'center',
    flexDirection : 'row',
  }
})

export const Rating = ({ rating, onPress = identity, size }) => {
  return (
    <View style={styles.default}>
      {
        Array(5).fill().map(
          (_, i) => (
            <TouchableOpacity
              key={`rating-${i}`}
              onPress={() => onPress(i + 1)}
            >
              <MaterialCommunityIcons
                size={size}
                color={i < rating ? c.primary : c.secondary}
                name="star"
              />
            </TouchableOpacity>
          )
        )
      }
    </View>
  )
}