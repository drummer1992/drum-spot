import React from "react"
import { AdvertisementEditor } from "./AdvertisementEditor"
import { createAdvertisement } from "../../redux/actions/advertisement"
import { Route as r } from "../../constants/app"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"

export const CreateAdScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const createHandler = newAd => {
    return dispatch(createAdvertisement({ ...newAd, price: parseInt(newAd.price) }))
      .then(response => {
        if (response instanceof Error) {
          return Alert.alert('Помилка', 'Щось пішло не так, спробуйте будь ласка ще раз')
        }

        navigation.navigate(r.home.name)
      })
  }

  return <AdvertisementEditor
    onPressPublish={createHandler}
    buttonTitle="Опублікувати"
  />
}
