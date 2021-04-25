import { Alert, Keyboard, StyleSheet, Switch, TouchableWithoutFeedback, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Card } from "../../components/ui/Card"
import { PhotoArea } from "./PhotoArea"
import { AdvertisementFlags } from "./AdvertisementFlags"
import { ConditionRating } from "../../components/ConditionRating"
import { Input, InputHeader } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"
import { Color as c } from "../../constants/app"
import React from "react"
import { createValidator } from "../../errors/validator"
import { array, max, maxLength, min, minLength, required } from "../../errors/validator/validators"

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

export const AdvertisementEditor = ({
  onPressPublish,
  buttonTitle,
  onDeleteImage,
  onAddImage,
  title,
  price,
  details,
  city,
  images,
  rating,
  isNewStuff,
  isRent,
  priceNegotiating,
  setIsRent,
  setIsNew,
  setRating,
  setTitle,
  setPrice,
  setCity,
  setDetails,
  setPriceNegotiating,
}) => {
  const handleSubmit = () => {
    const data = {
      title,
      price,
      details,
      city,
      images,
      rating,
      isNewStuff,
      isRent,
      priceNegotiating,
    }

    const { valid, message } = validate(data)

    if (!valid) {
      return Alert.alert('Помилка валідації', message)
    }

    return onPressPublish(data)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <Card style={styles.imageContainer}>
            <PhotoArea
              images={images}
              onAdd={onAddImage}
              onDelete={onDeleteImage}
            />
          </Card>
          <View style={styles.advertisementTypesContainer}>
            <AdvertisementFlags
              isRent={isRent}
              setIsRent={setIsRent}
              isNewStuff={isNewStuff}
              setIsNew={setIsNew}
            />
          </View>
          {!isNewStuff && <ConditionRating onPress={setRating} rating={rating}/>}
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
          <View style={styles.switchContainer}>
            <InputHeader title="Торг"/>
            <Switch
              style={styles.switch}
              value={priceNegotiating}
              onValueChange={() => setPriceNegotiating(!priceNegotiating)}
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
  switchContainer            : {
    flexDirection: 'row',
    alignItems   : 'center',
    alignSelf    : 'flex-end',
  },
  switch                     : {
    marginRight: 40,
  },
})