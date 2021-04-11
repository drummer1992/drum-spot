import React from "react"
import { View, StyleSheet, Text, Image } from 'react-native'
import Avatar from "./ui/Avatar"
import { Card } from "./ui/Card"

export const Advertisement = ({ img, title, price, style }) => {
  return (
    <Card style={style}>
      <Image
        style={styles.image}
        source={img}
      />
      <View style={styles.footer}>
        <Avatar src={require('../../assets/ava.jpeg')} size={50} imageStyle={styles.avatar}/>
        <View style={styles.textArea}>
          <Text
            style={styles.text}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={{ ...styles.text, fontFamily: 'roboto-bold', fontSize: 18 }}
            numberOfLines={1}
          >
            {price} грн
          </Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  image   : {
    borderTopLeftRadius : 6,
    borderTopRightRadius: 6,
    width               : '100%',
    height              : '80%',
  },
  avatar  : {
    left  : 5,
    bottom: 20,
  },
  footer  : {
    flexDirection: 'row',
  },
  textArea: {
    flexDirection   : 'row',
    alignItems      : 'center',
    marginHorizontal: 10,
    marginBottom    : 10,
    width           : '95%',
    overflow        : 'hidden'
  },
  text    : {
    width   : '63%',
    overflow: 'hidden',
  }
})
