import { Route as r } from "../constants/app"
import { Profile } from "../screens/Profile/Profile"
import { About } from "../screens/Profile/About"
import { Chat } from "../screens/Chat/Chat"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { defaultNavigationOptions } from "./common"
import { OwnAdvertisements } from "../screens/Profile/OwnAdvertisements"
import { EditAdScreen } from "../screens/Advertisement/EditAd"
import { AdvertisementDetails } from "../screens/Advertisement/AdvertisementDetails"
import { useSelector } from "react-redux"
import { selectAuth, selectUser } from "../redux/reducers/user"
import { Loader } from "../components/Loader"
import { Favorites } from "../screens/Favorites/Favorites"
import { ChatConversation, chatConversationOptions } from "../screens/Chat/ChatConversation"

const ProfileStack = createStackNavigator()

const profileLoader = loading => props => {
  return (
    <Loader
      loading={loading}
    >
      <Profile {...props}/>
    </Loader>
  )
}

export const ProfileStackScreen = () => {
  const auth = useSelector(selectAuth)
  const user = useSelector(selectUser)

  const loading = auth.loading || user.loading

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={r.profile.name}
        component={profileLoader(loading)}
        options={{ title: r.profile.title, ...defaultNavigationOptions }}
      />
      <ProfileStack.Screen
        name={r.about.name}
        component={About}
        options={{ title: r.about.title, ...defaultNavigationOptions }}
      />
      <ProfileStack.Screen
        name={r.chat.name}
        component={Chat}
        options={{ title: r.chat.title, ...defaultNavigationOptions }}
      />
      <ProfileStack.Screen
        name={r.chatConversation.name}
        component={ChatConversation}
        options={props => ({
          ...defaultNavigationOptions,
          ...chatConversationOptions(props)
        })}
      />
      <ProfileStack.Screen
        name={r.ownAdvertisements.name}
        component={OwnAdvertisements}
        options={{ title: r.ownAdvertisements.title, ...defaultNavigationOptions }}
      />
      <ProfileStack.Screen
        name={r.favorites.name}
        component={Favorites}
        options={{ title: r.favorites.title, ...defaultNavigationOptions }}
      />
      <ProfileStack.Screen
        name={r.editAd.name}
        component={EditAdScreen}
        options={{ title: r.editAd.title, ...defaultNavigationOptions }}
      />
      <ProfileStack.Screen
        name={r.advertisementDetails.name}
        component={AdvertisementDetails}
        options={{
          ...defaultNavigationOptions,
          title: r.advertisementDetails.title,
        }}
      />
    </ProfileStack.Navigator>
  )
}