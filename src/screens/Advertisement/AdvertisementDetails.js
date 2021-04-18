import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Card } from "../../components/ui/Card"
import { ImageSlider } from "../../components/ui/Slider"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Color as c, Route as r } from "../../constants/app"
import { BoldText, RegularText } from "../../components/ui/Text"
import { ConditionMessageByRating } from "../../components/ConditionRating"
import { Button } from "../../components/ui/Button"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/user"
import { deleteAdvertisement } from "../../redux/actions/advertisement"
import { handleDeleteEntity } from "../../alerts/delete"

const ValueBox = ({ title, value }) => (
  <Card style={styles.valueContainer}>
    <View style={styles.valueTextContainer}>
      <BoldText>{title}:</BoldText>
      <RegularText>{value}</RegularText>
    </View>
  </Card>
)

export const AdvertisementDetails = ({ route }) => {
  const [active, setActive] = useState(0)
  const { item } = route.params

  const user = useSelector(selectUser)

  const isOwner = user && user._id === item.ownerId

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleEdit = () => {
    if (isOwner) {
      return navigation.navigate({
        name  : r.editAd.name,
        params: { item },
      })
    }

    navigation.navigate(r.chat.name)
  }

  const handleDelete = () => {
    handleDeleteEntity(item.title, () => {
      navigation.navigate(r.home.name)
      dispatch(deleteAdvertisement(item._id))
    })
  }

  return (
    <Card style={styles.container}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.imageContainer}>
          <ImageSlider
            images={item.images}
            setActive={setActive}
            active={active}
            resizeMode="cover"
            ImageStyle={{ borderRadius: 6 }}
          />
        </Card>
        <Card style={styles.default}>
          <View style={styles.valuesContainer}>
            {
              item.isNew
                ? <ValueBox title="Новий" value={'Так'}/>
                : <ValueBox title="Стан" value={ConditionMessageByRating[item.rating]}/>
            }
            <ValueBox title="Оренда" value={item.isRent ? 'Так' : 'Ні'}/>
            <ValueBox title="Торг" value={item.priceNegotiating ? 'Так' : 'Ні'}/>
            <ValueBox title="Місто" value={item.city}/>
            <ValueBox title="Ціна" value={`${item.price} грн`}/>
          </View>
        </Card>
        <Card style={styles.detailsContainer}>
          <View style={styles.detailsTextContainer}>
            <BoldText style={{ fontSize: 20 }}>Деталі:</BoldText>
            <View style={{ marginTop: 10 }}>
              <RegularText style={{ marginLeft: 5 }}>{item.details}</RegularText>
            </View>
          </View>
        </Card>
        <View style={styles.buttonContainer}>
          <Button
            title={isOwner ? 'Редагувати' : "Зв'язатися з автором"}
            color={c.primary}
            style={{
              borderColor: c.primary,
              width      : '100%',
            }}
            onPress={handleEdit}
          />
          {
            isOwner &&
            <Button
              title="Видалити"
              color={c.destructive}
              style={styles.button}
              onPress={handleDelete}
            />
          }
        </View>
      </KeyboardAwareScrollView>
    </Card>
  )
}

export const advertisementOptions = ({ route }) => ({
  title: route.params.item.title,
})

const styles = StyleSheet.create({
  default                    : {
    width    : '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  container                  : {
    height        : '100%',
    marginVertical: 4,
  },
  imageContainer             : {
    height        : 250,
    width         : '100%',
    alignSelf     : 'center',
    justifyContent: 'center',
    borderRadius  : 6,
  },
  advertisementTypesContainer: {
    flexDirection: 'row',
    height       : 50,
    alignItems   : 'center',
  },
  valuesContainer            : {
    flexDirection: 'row',
    margin       : 5,
    flexWrap     : 'wrap',
  },
  valueContainer             : {
    flexDirection : 'row',
    margin        : 10,
    padding       : 5,
    borderColor   : c.secondary,
    justifyContent: 'space-between',
  },
  valueTextContainer         : {
    marginHorizontal: 5,
    flexDirection   : 'row',
  },
  detailsContainer           : {
    width    : '100%',
    minHeight: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  detailsTextContainer       : {
    marginLeft: 10,
    marginTop : 10,
  },
  buttonContainer            : {
    marginVertical  : 40,
    marginHorizontal: 5,
  },
  button                     : {
    marginVertical: 10,
    borderColor   : c.primary,
    width         : '100%',
  }
})