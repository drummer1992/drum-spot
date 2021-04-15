import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native"
import ImagePicker from "react-native-image-crop-picker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Color as c } from "../../constants/app"
import React, { useState } from "react"
import { ImageSlider } from "../../components/ui/Slider"
import { Code } from "../../../errors/constants"

const cameraConfig = { width: 300, height: 200, cropping: true }

export const PhotoArea = ({ images, setImages }) => {
  const [active, setActive] = useState(0)

  const handlePress = selectedImageIndex => {
    const handleChose = fn => () => fn(cameraConfig)
      .then(image => {
        setImages(images => [image.path, ...images])
        setActive(0)
      })
      .catch(error => {
        if (error.code !== Code.Picker.CANCELLED) {
          throw error
        }
      })

    const handleDelete = () => {
      setImages(images => images.filter((_, i) => i !== selectedImageIndex))
    }

    const buttons = [
      { text: 'Камера', onPress: handleChose(ImagePicker.openCamera) },
      { text: 'Галерея', onPress: handleChose(ImagePicker.openPicker) },
      { text: 'Назад', style: 'destructive' },
    ]

    if (!isNaN(selectedImageIndex)) {
      buttons.push({ text: 'Видалити', style: 'destructive', onPress: handleDelete },)
    }

    Alert.alert(
      'Нове фото',
      'Виберіть одну із опцій',
      buttons
    )
  }

  return (
    <View style={styles.container}>
      {
        images.length
          ? <ImageSlider
            onLongPress={handlePress}
            images={images}
            ScrollStyle={{ borderRadius: 6 }}
            active={active}
            setActive={setActive}
          />
          : (
            <TouchableOpacity style={styles.icon} onPress={handlePress}>
              <MaterialCommunityIcons
                name='camera'
                size={100}
                color={c.primary}
              />
              <Text style={styles.text}>Додати фото</Text>
            </TouchableOpacity>
          )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems    : 'center',
    justifyContent: 'center',
    borderRadius  : 6,
  },
  icon     : {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
  },
  text     : {
    fontSize  : 25,
    fontFamily: 'roboto-regular',
  },
})