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
  InputContainerStyle = {},
  InputWrapperStyle = {},
  InputStyle = {},
  multiline,
}) => (
  <View style={{ ...styles.container, ...InputContainerStyle }}>
    <View style={{ ...styles.wrapper, ...InputWrapperStyle }}>
      <TextInput
        placeholder={placeHolder}
        onChangeText={onChangeText}
        value={text}
        keyboardType={keyboardType}
        multiline={multiline}
        style={{ ...styles.input, ...InputStyle, }}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  header   : { marginHorizontal: 15 },
  container: {
    alignItems    : 'center',
    justifyContent: 'center',
    height        : 60,
    marginVertical: 5,
  },
  wrapper  : {
    width          : '95%',
    overflow       : 'hidden',
    backgroundColor: '#f4f4f4',
    borderRadius   : 6,
  },
  input    : {
    padding: Platform.select({
      android: 25,
      ios    : 20,
    }),
  },
})
