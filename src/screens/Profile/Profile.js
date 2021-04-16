import React from "react"
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { Card } from "../../components/ui/Card"
import { Color as c, Route as r } from "../../constants/app"
import Avatar from "../../components/ui/Avatar"
import { BoldText, RegularText } from "../../components/ui/Text"
import { Button } from "../../components/ui/Button"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../redux/reducers/user"
import { useNavigation } from "@react-navigation/native"
import { signIn } from "../../redux/actions/user"

const NavigationRow = ({ children, name, params, icon, onPress }) => {
  const navigation = useNavigation()

  const handlePress= onPress || (
    () => navigation.navigate({ name, params })
  )

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.rowTextContainer}
        onPress={handlePress}
      >
        <RegularText style={styles.rowText}>{children}</RegularText>
        <View style={styles.rowIcon}>
          <FontAwesome name={icon || 'arrow-right'} size={25} color={c.primary}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

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
        <NavigationRow>Мої оголошення</NavigationRow>
        <NavigationRow>Повідомлення</NavigationRow>
        <NavigationRow>Вибране</NavigationRow>
        <NavigationRow>Подати оголошення</NavigationRow>
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
  const dispatch = useDispatch()

  const handleLogin = () => dispatch(signIn())

  return (
    <React.Fragment>
      <View style={styles.headerContainer}>
        <View style={{ width: '50%', margin: 20 }}>
          <BoldText style={{ fontSize: 30 }}>Вітаю в
            <BoldText style={{ color: c.primary }}> DrumSpot</BoldText>
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
        <NavigationRow onPress={handleLogin} icon="facebook-square">Увійти</NavigationRow>
        <NavigationRow name={r.about.name}>Про додаток</NavigationRow>
        <NavigationRow name={r.home.name}>На головну</NavigationRow>
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
    <ScrollView contentContainerStyle={{ height: '100%' }}>
      <Card style={styles.container}>
        <ProfileScreen/>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container        : {
    alignItems    : 'center',
    overflow      : 'hidden',
    marginVertical: 5,
    height: '98%'
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