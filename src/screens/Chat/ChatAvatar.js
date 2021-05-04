import { Color as c } from "../../constants/app"
import { Text, View, StyleSheet } from "react-native"
import UIAvatar from "../../components/ui/Avatar"
import React from "react"

const Avatar = props => {
  const activeColor = props.isActive ? c.primary : c.destructive

  return (
    <View>
      <UIAvatar {...props}/>
      <Text style={{ ...styles.badge, color: activeColor }}>⬤</Text>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    position     : 'absolute',
    bottom       : 0,
    alignSelf    : 'flex-end',
  }
})