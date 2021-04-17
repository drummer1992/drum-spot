import React from "react"
import { AdvertisementEditor } from "./AdvertisementEditor"
import { createAdvertisement } from "../../redux/actions/advertisement"
import { Route as r } from "../../constants/app"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"

export const EditAdScreen = ({ route }) => {
  const { params: { item } } = route

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const updateHandler = newAd => {
    return dispatch(createAdvertisement(newAd))
      .then(() => {
        navigation.navigate(r.home.name)
      })
      .catch(() => alert('Щось пішло не так, спробуйте будь ласка ще раз'))
  }

  return <AdvertisementEditor
    initialState={item}
    onPressPublish={updateHandler}
    buttonTitle="Зберегти"
  />
}