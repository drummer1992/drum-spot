import React, { useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { Card } from "../../components/ui/Card"
import { ImageSlider } from "../../components/ui/Slider"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Color as c, Route as r } from "../../constants/app"
import { BoldText, RegularText } from "../../components/ui/Text"
import { ConditionMessageByRating } from "../../components/ConditionRating"
import { Button } from "../../components/ui/Button"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { selectFavoritesState, selectUser } from "../../redux/reducers/user"
import { deleteAdvertisement } from "../../redux/actions/advertisement"
import { handleDeleteEntity } from "../../alerts/delete"
import { Container } from "../../components/ui/Container"
import { addToFavorites, deleteFromFavorites } from "../../redux/actions/user"

const ValueBox = ({ title, value }) => (
  <Card style={styles.valueContainer}>
    <View style={styles.valueTextContainer}>
      <BoldText>{title}:</BoldText>
      <RegularText>{value}</RegularText>
    </View>
  </Card>
)

export const AdvertisementDetails = ({ route }) => {
  const [activeImage, setActiveImage] = useState(0)
  const { item } = route.params

  const user = useSelector(selectUser)
  const favorites = useSelector(selectFavoritesState)

  const isOwner = user && user._id === item.user._id
  const isFavorite = favorites.list.includes(item._id)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const goToEditor = () => {
    navigation.navigate({
      name  : r.editAd.name,
      params: { item },
    })
  }

  const goToChat = () => {
    navigation.navigate({
      name  : r.chat.name,
      params: { userId: item.user._id }
    })
  }

  const handleDelete = () => {
    handleDeleteEntity(item.title, () => {
      navigation.navigate(r.home.name)
      dispatch(deleteAdvertisement(item._id))
    })
  }

  const handleFavorites = action => () => {
    if (!user._id) {
      return Alert.alert(
        'Ви не авторизовані',
        'Нажаль ця дія доступна тільки авторизованим користувачам',
        [
          { text: 'Перейти до логіну', onPress: () => navigation.navigate(r.profile.name) },
          { text: 'Назад' },
        ],
        { cancelable: false },
      )
    }

    dispatch(action(item._id))
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
            setActive={setActiveImage}
            active={activeImage}
            resizeMode="cover"
            ImageStyle={{ borderRadius: 6 }}
          />
        </Card>
        <View style={styles.titleContainer}>
          <RegularText style={styles.title}>
            {item.title}
          </RegularText>
        </View>
        <Container style={styles.default}>
          <View style={styles.valuesContainer}>
            {
              item.isNewStuff
                ? <ValueBox title="Новий" value={'Так'}/>
                : <ValueBox title="Стан" value={ConditionMessageByRating[item.rating]}/>
            }
            <ValueBox title="Оренда" value={item.isRent ? 'Так' : 'Ні'}/>
            <ValueBox title="Торг" value={item.priceNegotiating ? 'Так' : 'Ні'}/>
            <ValueBox title="Місто" value={item.city}/>
            <ValueBox title="Ціна" value={`${item.price} грн`}/>
          </View>
        </Container>
        <Container style={styles.detailsContainer}>
          <View style={styles.detailsTextContainer}>
            <BoldText style={styles.details}>Деталі:</BoldText>
            <View style={styles.detailsSubContainer}>
              <RegularText style={{ marginLeft: 5 }}>{item.details}</RegularText>
            </View>
          </View>
        </Container>
        <View style={styles.buttonContainer}>
          {
            isOwner
              ? <Button
                title="Редагувати"
                color={c.primary}
                style={styles.button}
                onPress={goToEditor}
              />
              : <Button
                title="Зв'язатися з автором"
                color={c.primary}
                style={styles.button}
                onPress={goToChat}
              />
          }
          {
            isOwner
              ? <Button
                title="Видалити"
                color={c.destructive}
                style={styles.button}
                onPress={handleDelete}
              />
              : <Button
                title={isFavorite ? "Видалити з вибраного" : "Додати у вибране"}
                color={c.primary}
                style={styles.button}
                onPress={handleFavorites(isFavorite ? deleteFromFavorites : addToFavorites)}
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
    minHeight: 60,
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
    marginVertical: 5,
    borderColor   : c.primary,
    width         : '100%',
  },
  titleContainer             : {
    width            : '90%',
    justifyContent   : 'center',
    height           : 50,
    borderBottomWidth: 1,
    borderBottomColor: c.primary,
    overflow         : 'hidden',
  },
  details                    : { fontSize: 20 },
  detailsSubContainer        : { marginTop: 10 },
  title                      : {
    fontSize  : 20,
    marginLeft: 10,
  },
})