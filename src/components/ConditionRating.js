import { Text, View } from "react-native"
import { Rating } from "./ui/Rating"
import React from "react"

export const ConditionMessageByRating = {
  1: 'В дуже поганому стані',
  2: 'В поганому стані',
  3: 'В робочому стані',
  4: 'В гарному стані',
  5: 'В ідеальному стані',
}

export const ConditionRating = ({ rating, onPress }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 5 }}>
      <Text>{ConditionMessageByRating[rating]}</Text>
      <Rating rating={rating} onPress={onPress} size={40}/>
    </View>
  )
}