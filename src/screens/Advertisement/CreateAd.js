import React, { useState } from "react"
import { AdvertisementEditor } from "./AdvertisementEditor"
import { createAdvertisement } from "../../redux/actions/advertisement"
import { Route as r } from "../../constants/app"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"

export const CreateAdScreen = () => {
  const [isRent, setIsRent] = useState(false)
  const [isNewStuff, setIsNew] = useState(false)
  const [priceNegotiating, setPriceNegotiating] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [city, setCity] = useState('')
  const [details, setDetails] = useState('')
  const [images, setImages] = useState([])
  const [rating, setRating] = useState(4)

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const createHandler = newAd => {
    return dispatch(createAdvertisement({
      ...newAd,
      price: parseInt(newAd.price),
      images,
    }))
      .then(() => {
        navigation.navigate(r.home.name)

        setIsRent(false)
        setIsNew(false)
        setTitle('')
        setPrice('')
        setCity('')
        setDetails('')
        setImages([])
      })
      .catch(() => {
        Alert.alert('Помилка', 'Щось пішло не так, спробуйте будь ласка ще раз')
      })
  }

  const handleImageAdd = image => {
    setImages(images => [image, ...images])
  }

  const handleImageDelete = image => {
    setImages(images => images.filter(img => img.path !== image))
  }

  return <AdvertisementEditor
    onPressPublish={createHandler}
    buttonTitle="Опублікувати"
    onAddImage={handleImageAdd}
    onDeleteImage={handleImageDelete}
    setRating={setRating}
    setIsNew={setIsNew}
    setIsRent={setIsRent}
    setCity={setCity}
    setDetails={setDetails}
    setPrice={setPrice}
    setPriceNegotiating={setPriceNegotiating}
    setTitle={setTitle}
    isRent={isRent}
    isNewStuff={isNewStuff}
    priceNegotiating={priceNegotiating}
    title={title}
    price={price}
    city={city}
    details={details}
    images={images.map(img => img.path)}
    rating={rating}
  />
}
