import { Button as NativeButton, StyleSheet, TouchableHighlight, View } from "react-native"
import { Color as c } from "../../constants/app"
import React from "react"
import identity from "lodash/identity"

export const AdvertisementFlags = ({
  isRent,
  setIsRent = identity,
  isNewStuff,
  setIsNew = identity,
  readOnly
}) => {
  const Wrapper = readOnly ? View : TouchableHighlight

  const Button = props => (
    <NativeButton {...{
      ...props,
      disabled: readOnly && props.color === 'grey'
    }}/>
  )

  return (
    <View style={styles.container}>
      <Wrapper>
        <Button
          title="Продаж"
          onPress={() => setIsRent(false)}
          color={isRent === false ? c.primary : 'grey'}

        >
        </Button>
      </Wrapper>
      <Wrapper>
        <Button
          title="Оренда"
          onPress={() => setIsRent(true)}
          color={isRent === true ? c.primary : 'grey'}
        />
      </Wrapper>
      <Wrapper>
        <Button
          title="Новий"
          onPress={() => setIsNew(true)}
          color={isNewStuff === true ? c.primary : 'grey'}
        >
        </Button>
      </Wrapper>
      <Wrapper>
        <Button
          title="Вживаний"
          onPress={() => setIsNew(false)}
          color={isNewStuff === false ? c.primary : 'grey'}
        />
      </Wrapper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width         : '100%',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-around'
  },
})
