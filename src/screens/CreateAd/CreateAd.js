import React, { useState } from "react"
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard, Alert
} from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from "../../components/ui/Card"
import { Color as c, Route as r } from "../../constants/app"
import { PhotoArea } from "./PhotoArea"
import { Input, InputHeader } from "../../components/ui/Input"
import { AdvertisementFlags } from "./AdvertisementFlags"
import { array, max, maxLength, min, minLength, required } from "../../../errors/validator/validators"
import { createValidator } from "../../../errors/validator"
import { useDispatch } from "react-redux"
import { createAdvertisement } from "../../redux/actions/advertisement"
import { Button } from "../../components/ui/Button"
import { ConditionRating } from "../../components/ConditionRating"

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

export const CreateAdScreen = ({ navigation }) => {
  const [isRent, setIsRent] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [priceNegotiating, setPriceNegotiating] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [city, setCity] = useState('')
  const [details, setDetails] = useState('')
  const [images, setImages] = useState([])
  const [rating, setRating] = useState(4)

  const dispatch = useDispatch()

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
    }

    const { valid, message } = validate(newAd)

    if (!valid) {
      return Alert.alert('Помилка валідації', message)
    }

    dispatch(createAdvertisement(newAd))
      .then(() => {
        setIsRent(false)
        setIsNew(false)
        setTitle('')
        setPrice('')
        setCity('')
        setDetails('')
        setImages([])

        navigation.navigate(r.home.name)
      })
      .catch(() => alert('Щось пішло не так, спробуйте будь ласка ще раз'))
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
              InputContainerStyle={{ height: null, minHeight: 80, paddingVertical: 10 }}
              InputWrapperStyle={{ paddingVertical: Platform.select({ ios: 20 }) }}
              multiline={true}
            />
          </View>
          <Button
            color={c.primary}
            title="Опублікувати"
            onPress={handleSubmit}
            style={{ borderColor: c.primary, marginBottom: 10 }}
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
  inputContainer             : { marginTop: 10 },
})
