import React, { useState } from "react"
import { AdvertisementEditor } from "./AdvertisementEditor"
import { addAdvertisementImage, deleteAdvertisementImage, updateAdvertisement } from "../../redux/actions/advertisement"
import { Route as r } from "../../constants/app"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { selectAdvertisement } from "../../redux/reducers/advertisement"
import { difference } from "../../utils/object"
import { Alert } from "react-native"

export const EditAdScreen = ({ route }) => {
  const { params: { item } } = route

  const ad = useSelector(selectAdvertisement(item._id))

  const [isRent, setIsRent] = useState(ad.isRent)
  const [isNewStuff, setIsNew] = useState(ad.isNewStuff)
  const [priceNegotiating, setPriceNegotiating] = useState(Boolean(ad.priceNegotiating))
  const [title, setTitle] = useState(ad.title)
  const [price, setPrice] = useState(String(ad.price))
  const [city, setCity] = useState(ad.city)
  const [details, setDetails] = useState(ad.details)
  const [rating, setRating] = useState(ad.rating)
  const [images, setImages] = useState(ad.images)

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const updateHandler = data => {
    data.price = parseInt(data.price)

    const changes = difference(ad, data)

    delete changes.images

    if (Object.keys(changes).length) {
      return dispatch(updateAdvertisement(item._id, changes))
        .then(() => {
          navigation.navigate(r.home.name)
        })
        .catch(() => {
          Alert.alert('Помилка', 'Щось пішло не так, спробуйте будь ласка ще раз')
        })
    }

    Alert.alert('Помилка', 'Ви нічого не змінили')
  }

  const handleImageDeleted = image => dispatch(deleteAdvertisementImage(item._id, image))
    .then(() => {
      setImages(images => images.filter(img => img !== image))
    })

  const handleImageAdd = image => dispatch(addAdvertisementImage(item._id, image))
    .then(path => {
      setImages(images => [path, ...images])
    })

  return <AdvertisementEditor
    onPressPublish={updateHandler}
    onDeleteImage={handleImageDeleted}
    onAddImage={handleImageAdd}
    buttonTitle="Зберегти"
    isRent={isRent}
    isNewStuff={isNewStuff}
    priceNegotiating={priceNegotiating}
    title={title}
    price={price}
    city={city}
    details={details}
    rating={rating}
    images={images}
    setTitle={setTitle}
    setPriceNegotiating={setPriceNegotiating}
    setPrice={setPrice}
    setDetails={setDetails}
    setCity={setCity}
    setIsRent={setIsRent}
    setIsNew={setIsNew}
    setRating={setRating}
  />
}
