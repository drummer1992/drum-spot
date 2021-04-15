import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Card } from "../../components/ui/Card"
import { ImageSlider } from "../../components/ui/Slider"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Color as c } from "../../constants/app"
import { BoldText, RegularText } from "../../components/ui/Text"
import { ConditionMessageByRating } from "../../components/ConditionRating"
import { Button } from "../../components/ui/Button"

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
            resizeMode="contain"
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
        <Card style={{
          width    : '100%',
          minHeight: 150,
          alignSelf: 'center',
          marginTop: 10,
        }}>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <BoldText style={{ fontSize: 20 }}>Деталі:</BoldText>
            <View style={{ marginTop: 10 }}>
              <RegularText style={{ marginLeft: 5 }}>{item.details}</RegularText>
            </View>
          </View>
        </Card>
        <View style={{ margin: 20 }}>
          <Button
            title="Зв'язатися з автором"
            color={c.primary}
            style={{
              borderColor: c.primary,
              width      : '100%',
            }}
          />
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
  }
})