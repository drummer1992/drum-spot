import React, { useState } from "react"
import { Card } from "./ui/Card"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { BoldText } from "./ui/Text"
import { Color as c } from "../constants/app"

export const ChoiceTab = () => {
  const [isFoo, setFoo] = useState(true)

  return (
    <Card style={styles.container}>
      <View style={styles.choiceContainer}>
        <TouchableOpacity
          style={{ ...styles.choiceItem, borderBottomWidth: isFoo && 2 }}
          onPress={() => setFoo(true)}
        >
          <BoldText style={styles.choiceText}>Foo</BoldText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.choiceItem, borderBottomWidth: !isFoo && 2 }}
          onPress={() => setFoo(false)}
        >
          <BoldText style={styles.choiceText}>Bar</BoldText>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container      : {
    flex          : 1,
    marginVertical: 5,
    alignItems    : 'center',
  },
  choiceContainer: {
    height        : 50,
    width         : '95%',
    flexDirection : 'row',
    justifyContent: 'space-between'
  },
  choiceItem     : {
    borderBottomColor: c.primary,
    borderBottomWidth: 2,
    height           : '100%',
    width            : '49%',
  },
  choiceText     : {
    marginTop : 18,
    marginLeft: 5,
    fontSize  : 20,
  },
})