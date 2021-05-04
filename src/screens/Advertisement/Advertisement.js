import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native'
import Avatar from "../../components/ui/Avatar"
import { Card } from "../../components/ui/Card"
import { useNavigation } from "@react-navigation/native"
import { Route as r } from "../../constants/app"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/user"
import { deleteAdvertisement } from "../../redux/actions/advertisement"
import { alertDeleteAdvertisement } from "../../alerts"

export const Advertisement = ({ item }) => {
  const { images, title, price } = item

  const navigation = useNavigation()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const isOwner = user && user._id === item.user._id

  const handlePress = () => {
    navigation.navigate({
      name  : r.advertisementDetails.name,
      params: { item },
    })
  }

  const navigateToEditor = () => navigation.navigate({
    name  : r.editAd.name,
    params: { item },
  })

  const deleteItem = () => {
    alertDeleteAdvertisement(title, () => dispatch(deleteAdvertisement(item._id)))
  }

  const handleLongPress = () => {
    if (isOwner) {
      Alert.alert(
        'Що будемо робити?',
        'Виберіть один із варіантів',
        [
          { text: 'Редагувати', onPress: navigateToEditor },
          { text: 'Видалити', onPress: deleteItem, style: 'destructive' },
          { text: 'Закрити', style: 'cancel' },
        ],
        { cancelable: true },
      )
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Card style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: images[0] }}
          resizeMode="cover"
        />
        <View style={styles.footer}>
          <Avatar src={{ uri: item.user.imageURL }} size={50} imageStyle={styles.avatar}/>
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height        : 220,
    marginVertical: 6,
  },
  image    : {
    borderTopLeftRadius : 6,
    borderTopRightRadius: 6,
    width               : '100%',
    height              : '80%',
  },
  avatar   : {
    left  : 5,
    bottom: 20,
  },
  footer   : {
    flexDirection: 'row',
  },
  textArea : {
    flexDirection   : 'row',
    alignItems      : 'center',
    marginHorizontal: 10,
    marginBottom    : 10,
    width           : '85%',
  },
  text     : {
    width   : '63%',
    overflow: 'hidden',
  }
})