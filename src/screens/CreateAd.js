import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Card } from "../components/ui/Card"
import { Color as c } from "../constants/app"

const MakePhotoComponent = () => {
  return (
    <View style={styles.touchableCamera}>
      <TouchableHighlight
        onPress={() => {}}
        underlayColor='none'
      >
        <View style={styles.makePhotoContainer}>
          <MaterialCommunityIcons
            name='camera'
            size={100}
            color={c.primary}
          />
          <Text style={{ fontSize: 25, fontFamily: 'roboto-regular' }}>Додати фото</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const TypesOfAdvertisement = ({ chosenRent, setChosenRent }) => {
  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
      <TouchableHighlight style={{ marginRight: 10 }}>
        <Button
          title="Продаж"
          onPress={() => setChosenRent(false)}
          color={chosenRent === false ? c.primary : 'grey'}
        >
        </Button>
      </TouchableHighlight>
      <TouchableHighlight>
        <React.Fragment>
          <Button
            title="Оренда"
            onPress={() => setChosenRent(true)}
            color={chosenRent === true ? c.primary : 'grey'}
          />
        </React.Fragment>
      </TouchableHighlight>
    </View>
  )
}

const InputHeader = ({ title }) => (
  <View style={{ marginHorizontal: 15, marginBottom: 5 }}>
    <Text>{title}</Text>
  </View>
)

const Input = ({
  onChangeText,
  text,
  placeHolder,
  keyboardType,
  InputContainerStyle = {},
  InputWrapperStyle = {},
  InputStyle = {},
  multiline,
}) => (
  <View style={{ ...styles.inputContainer, ...InputContainerStyle }}>
    <View style={{ ...styles.inputWrapper, ...InputWrapperStyle }}>
      <TextInput
        placeholder={placeHolder}
        onChangeText={onChangeText}
        value={text}
        keyboardType={keyboardType}
        multiline={multiline}
        style={{ ...styles.input, ...InputStyle, }}
      />
    </View>
  </View>
)

export const CreateAdScreen = () => {
  const [chosenRent, setChosenRent] = useState(false)
  const [header, setHeader] = useState('')
  const [price, setPrice] = useState('')
  const [details, setDetails] = useState('')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
        <Card style={styles.card}>
          <Card style={styles.imageContainer}>
            <MakePhotoComponent/>
          </Card>
          <View style={styles.advertisementTypesContainer}>
            <TypesOfAdvertisement chosenRent={chosenRent} setChosenRent={setChosenRent}/>
          </View>
          <InputHeader title="Заголовок оголошення"/>
          <Input
            onChangeText={setHeader}
            placeHolder="Наприклад: Zildjian A Custom Hi-Hat 14"
            text={header}
          />
          <InputHeader title="Ціна"/>
          <Input
            onChangeText={setPrice}
            placeHolder="Наприклад: 6000"
            text={price}
            keyboardType="numeric"
          />
          <InputHeader title="Деталі"/>
          <Input
            onChangeText={setDetails}
            placeHolder="Наприклад: Звук шик..."
            text={details}
            InputContainerStyle={{ height: null, minHeight: 80 }}
            InputWrapperStyle={{ paddingTop: Platform.select({ ios: 20 }) }}
            multiline={true}
          />
          <View style={styles.button}>
            <Button color={c.primary} title="Створити" onPress={() => {
            }}/>
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  default                    : {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
  },
  card                       : {
    marginVertical: 5,
    width         : '97%',
    height        : '98%',
  },
  imageContainer             : {
    marginHorizontal: 0,
    alignItems      : 'center',
    justifyContent  : 'center',
    backgroundColor : '#f4f4f4'
  },
  touchableCamera            : {
    width         : '100%',
    height        : 200,
    alignItems    : 'center',
    justifyContent: 'center',
    borderRadius  : 6,
  },
  makePhotoContainer         : {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
  },
  advertisementTypesContainer: {
    flexDirection: 'row',
    height       : 50,
    alignItems   : 'center',
  },
  inputContainer             : {
    alignItems    : 'center',
    justifyContent: 'center',
    height        : 60,
    marginBottom  : 10,
  },
  inputWrapper               : {
    width          : '95%',
    overflow       : 'hidden',
    backgroundColor: '#f4f4f4',
    borderRadius   : 6,
  },
  input                      : {
    padding: Platform.select({
      android: 20,
      ios    : 25,
    }),
  },
  button                     : {
    justifyContent: 'center',
    alignItems    : 'center',
    marginBottom  : 10,
  }
})
