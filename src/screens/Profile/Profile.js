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
import { logOut, signIn } from "../../redux/actions/user"

const NavigationRow = ({ children, name, params, icon, onPress }) => {
  const navigation = useNavigation()

  const handlePress = onPress || (
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
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logOut)

  const { name, imageURL } = useSelector(selectUser)

  return (
    <React.Fragment>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Avatar size={120} src={imageURL}/>
        </View>
        <View style={[styles.drumIconContainer, {
          transform: [{ rotate: '340deg' }]
        }]}>
          <FontAwesome name="drum" size={200} color={c.primary}/>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <BoldText style={{ fontSize: 35 }}>Вітаю {name}</BoldText>
        </View>
      </View>
      <View style={{ width: '100%', marginVertical: '13%' }}>
        <NavigationRow name={r.ownAdvertisements.name}>Мої оголошення</NavigationRow>
        <NavigationRow name={r.chat.name}>Повідомлення</NavigationRow>
      </View>
      <View style={{ width: '90%' }}>
        <Button
          style={styles.button}
          color={c.primary}
          onPress={handleLogout}
          title="Вийти"
        />
      </View>
    </React.Fragment>
  )
}

const LoggedOutProfileScreen = () => {
  const dispatch = useDispatch()

  const handleLogin = () => dispatch(signIn)

  return (
    <React.Fragment>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <BoldText style={{ fontSize: 30 }}>Вітаю в
            <BoldText style={{ color: c.primary }}> DrumSpot</BoldText>
          </BoldText>
          <RegularText
            style={{ marginTop: 45 }}
          >
            Це місце де ви можете продати чи купити, орендувати чи здати в оренду свій барабаний стаф
          </RegularText>
        </View>
        <View style={[{ ...styles.drumIconContainer, right: 27 }, {
          transform: [{ rotate: '340deg' }]
        }]}>
          <FontAwesome name="drum" size={200} color={c.primary}/>
        </View>
      </View>
      <View style={{ width: '100%', marginVertical: '33%' }}>
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
    <ScrollView>
      <Card style={styles.container}>
        <ProfileScreen/>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container        : {
    flex          : 1,
    height        : '100%',
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
    marginVertical: 20,
    marginBottom  : 40,
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
  textContainer    : {
    width      : '50%',
    marginTop  : 20,
    marginLeft : 10,
    marginRight: 33,
  }
})