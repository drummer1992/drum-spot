import React from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { Card } from "../../components/ui/Card"
import { Color as c } from "../../constants/app"
import Avatar from "../../components/ui/Avatar"
import { BoldText, RegularText } from "../../components/ui/Text"
import { Button } from "../../components/ui/Button"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/user"

const Row = ({ children, onPress }) => (
  <View style={styles.rowContainer}>
    <TouchableOpacity style={styles.rowTextContainer} onPress={onPress}>
      <RegularText style={styles.rowText}>{children}</RegularText>
      <View style={styles.rowIcon}>
        <FontAwesome name={'arrow-right'} size={25} color={c.primary}/>
      </View>
    </TouchableOpacity>
  </View>
)

const LoggedInProfileScreen = () => {
  return (
    <React.Fragment>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Avatar size={120} src={require('../../../assets/ava.jpeg')}/>
        </View>
        <View style={[styles.drumIconContainer, {
          transform: [{ rotate: '340deg' }]
        }]}>
          <FontAwesome name="drum" size={200} color={c.primary}/>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <BoldText style={{ fontSize: 35 }}>Вітаю Andrii Varlamov</BoldText>
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <Row>Мої оголошення</Row>
        <Row>Повідомлення</Row>
        <Row>Вибране</Row>
        <Row>Подати оголошення</Row>
      </View>
      <View style={{ width: '90%' }}>
        <Button
          style={styles.button} color={c.primary} onPress={() => {
        }} title="Вийти"/>
      </View>
    </React.Fragment>
  )
}

const LoggedOutProfileScreen = () => {
  return (
    <React.Fragment>
      <View style={styles.headerContainer}>
        <View style={{ width: '50%', margin: 20 }}>
          <BoldText style={{ fontSize: 30 }}>Вітаю в
            <BoldText style={{ color: c.primary }}> drum_spot</BoldText>
          </BoldText>
          <RegularText
            style={{ marginTop: 45 }}
          >
            Це місце де ви можете продати чи купити, орендувати чи здати в оренду свій барабаний стаф
          </RegularText>
        </View>
        <View style={[{ ...styles.drumIconContainer, right: 30 }, {
          transform: [{ rotate: '340deg' }]
        }]}>
          <FontAwesome name="drum" size={200} color={c.primary}/>
        </View>
      </View>
      <View style={{ width: '100%', marginVertical: 80 }}>
        <Row>Увійти</Row>
        <Row>Зареєструватися</Row>
        <Row>Про додаток</Row>
        <Row>На головну</Row>
      </View>
    </React.Fragment>
  )
}

export const Profile = () => {
  const { loaded, error } = useSelector(selectUser)

  const ProfileScreen = (loaded && !error)
    ? LoggedInProfileScreen
    : LoggedOutProfileScreen

  return (
    <ScrollView>
      <Card style={styles.container}>
        <ProfileScreen/>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container        : {
    // flex          : 1,
    alignItems    : 'center',
    overflow      : 'hidden',
    marginVertical: 5,
  },
  headerContainer  : {
    flexDirection: 'row',
    width        : '100%',
  },
  drumIconContainer: {
    justifyContent: 'flex-start',
    alignItems    : 'flex-end',
    right         : -60,
  },
  avatarContainer  : {
    marginTop : 20,
    marginLeft: 20,
  },
  titleContainer   : {
    width: '100%',
  },
  title            : {
    flexDirection : 'row',
    alignItems    : 'flex-start',
    justifyContent: 'flex-start',
    margin        : 20,
  },
  button           : {
    marginVertical: 40,
    width         : '100%',
  },
  rowContainer     : {
    margin           : 10,
    borderBottomWidth: 1,
    borderBottomColor: c.primary,
    height           : 50,
    alignItems       : 'flex-start',
    justifyContent   : 'center',
  },
  rowTextContainer : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    width         : '100%',
  },
  rowText          : {
    marginHorizontal: 10,
    fontSize        : 20,
  },
  rowIcon          : {
    marginHorizontal: 20,
  },
})