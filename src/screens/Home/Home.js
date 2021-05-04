import React from "react"
import { APP_NAME, Route as r } from "../../constants/app"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { HeaderIcon } from "../../components/ui/HeaderIcon"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from "react-redux"
import { selectAuth } from "../../redux/reducers/user"
import { Advertisements } from "../Advertisement/Advertisements"

export const HomeScreen = Advertisements

export const homeScreenOptions = ({ navigation }) => {
  const { token } = useSelector(selectAuth)

  return {
    title: APP_NAME,
    ...(token ?
      {
        headerRight: () => (
          <HeaderButtons
            HeaderButtonComponent={props => <HeaderIcon {...props} IconComponent={Ionicons}/>}
          >
            <Item
              title={r.chat.title}
              iconName="chatbubble-outline"
              onPress={() => navigation.navigate(r.chat.name)}
            />
          </HeaderButtons>
        ),
        headerLeft : () => (
          <HeaderButtons
            HeaderButtonComponent={props => <HeaderIcon {...props} IconComponent={Ionicons}/>}
          >
            <Item
              title={r.favorites.title}
              iconName="ios-star-outline"
              onPress={() => navigation.navigate(r.favorites.name)}
            />
          </HeaderButtons>
        )
      }
      : {}),
  }
}