import { Text, TextInput, View, StyleSheet } from "react-native"
import React from "react"

export const InputHeader = ({ title, style }) => (
  <View style={{ ...styles.header, ...style }}>
    <Text>{title}</Text>
  </View>
)

export const Input = ({
  onChangeText,
  text,
  placeHolder,
  keyboardType,
  onFocus
}) => (
  <View style={{ ...styles.container }}>
    <View style={{ ...styles.wrapper }}>
      <TextInput
        placeholder={placeHolder}
        onChangeText={onChangeText}
        value={text}
        keyboardType={keyboardType}
        style={{ ...styles.input, }}
        multiline={true}
        onFocus={onFocus}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  header   : { marginHorizontal: 15 },
  container: {
    alignItems    : 'center',
    justifyContent: 'center',
    marginVertical: 5,
    minHeight     : 80,
  },
  wrapper  : {
    width          : '95%',
    overflow       : 'hidden',
    backgroundColor: '#f4f4f4',
    borderRadius   : 6,
    justifyContent : 'center',
    padding        : 10,
  },
  input    : {
    paddingTop: 11,
    padding: 10
  },
})
