import React from "react"
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from "./Card"
import { Button as NativeButton } from 'react-native'

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignSelf     : 'center',
    width         : '50%',
  }
})

export const Button = ({ onPress, title, color, style }) => {
  return (
    <TouchableOpacity>
      <Card style={{ ...styles.button, ...style }}>
        <NativeButton color={color} title={title} onPress={onPress}/>
      </Card>
    </TouchableOpacity>
  )
}