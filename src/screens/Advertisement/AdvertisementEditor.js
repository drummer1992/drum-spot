import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Card } from "../../components/ui/Card"
import { PhotoArea } from "./PhotoArea"
import { AdvertisementFlags } from "./AdvertisementFlags"
import { ConditionRating } from "../../components/ConditionRating"
import { Input, InputHeader } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Color as c } from "../../constants/app"
import React, { useState } from "react"
import { createValidator } from "../../../errors/validator"
import { array, max, maxLength, min, minLength, required } from "../../../errors/validator/validators"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/user"
const validate = createValidator({
  title  : [
    required('Заголовок не може бути пустим!'),
    minLength(5, 'Заголовок повинен містити більше п`яти символів!'),
    maxLength(30, 'Заголовок повинен містити меньше п`ятдесяти символів!')
  ],
  price  : [
    required('Ціна не може бути пуста!'),
    min(1, 'Ціна повинна мати позитивне значення!'),
    max(1e6, 'Якась захмарна ціна!'),
  ],
  city   : [
    required('Місто є обов`язковим до заповнення!'),
    minLength(3, 'Що це за місто таке?'),
  ],
  details: [
    required('Деталі не можуть залишатися пустими'),
    minLength(10, 'Будь ласка, залиште невеличкий опис вашого товару, мінімум 10 символів!'),
    maxLength(500, 'Опис завеликий, максимум 500 символів!'),
  ],
  images : [
    array(minLength(1, 'Щоб створити оголошення потрібно бодай одне фото!')),
  ],
})

export const AdvertisementEditor = ({ initialState = {}, onPressPublish, buttonTitle }) => {
  const [isRent, setIsRent] = useState(initialState.isRent || false)
  const [isNew, setIsNew] = useState(initialState.isNew || false)
  const [priceNegotiating, setPriceNegotiating] = useState(initialState.priceNegotiating)
  const [title, setTitle] = useState(initialState.title)
  const [price, setPrice] = useState(String(initialState.price || ''))
  const [city, setCity] = useState(initialState.city)
  const [details, setDetails] = useState(initialState.details)
  const [images, setImages] = useState(initialState.images || [])
  const [rating, setRating] = useState(initialState.rating || 4)

  const { id } = useSelector(selectUser)

  const handleSubmit = () => {
    const newAd = {
      title,
      price,
      details,
      city,
      images,
      rating,
      isNew,
      isRent,
      priceNegotiating,
      userId: id,
    }

    const { valid, message } = validate(newAd)

    if (!valid) {
      return Alert.alert('Помилка валідації', message)
    }

    return onPressPublish(newAd)
      .then(() => {
        setIsRent(false)
        setIsNew(false)
        setTitle('')
        setPrice('')
        setCity('')
        setDetails('')
        setImages([])
      })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <Card style={styles.imageContainer}>
            <PhotoArea setImages={setImages} images={images}/>
          </Card>
          <View style={styles.advertisementTypesContainer}>
            <AdvertisementFlags
              isRent={isRent}
              setIsRent={setIsRent}
              isNew={isNew}
              setIsNew={setIsNew}
            />
          </View>
          {!isNew && <ConditionRating onPress={setRating} rating={rating}/>}
          <View style={styles.inputContainer}>
            <InputHeader title="Заголовок оголошення"/>
            <Input
              onChangeText={setTitle}
              placeHolder="Наприклад: Zildjian A Custom Hi-Hat 14"
              text={title}
            />
            <InputHeader title="Ціна"/>
            <Input
              onChangeText={setPrice}
              placeHolder="Наприклад: 6000"
              text={price}
              keyboardType="numeric"
            />
            <InputHeader title="Місто"/>
            <Input
              onChangeText={setCity}
              placeHolder="Наприклад: Київ"
              text={city}
            />
            <InputHeader title="Деталі"/>
            <Input
              onChangeText={setDetails}
              placeHolder="Наприклад: Звук шик..."
              text={details}
            />
          </View>
          <Button
            color={c.primary}
            title={buttonTitle}
            onPress={handleSubmit}
            style={styles.button}
          />
        </Card>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card                       : {
    marginVertical: 5,
  },
  imageContainer             : {
    alignItems     : 'center',
    alignSelf      : 'center',
    backgroundColor: '#f4f4f4',
    height         : 250,
    width          : '100%',
  },
  advertisementTypesContainer: {
    flexDirection: 'row',
    height       : 50,
    alignItems   : 'center',
  },
  inputContainer             : {
    marginTop: 10,
  },
  button                     : {
    borderColor   : c.primary,
    marginVertical: 20,
    marginBottom  : 40,
    width         : '90%',
  },
})