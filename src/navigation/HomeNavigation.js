import { Route as r } from "../constants/app"
import { HomeScreen, homeScreenOptions } from "../screens/Home/Home"
import { AdvertisementDetails } from "../screens/Advertisement/AdvertisementDetails"
import { Chat } from "../screens/Chat/Chat"
import { Favorites } from "../screens/Favorites/Favorites"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { defaultNavigationOptions } from "./common"
import { EditAdScreen } from "../screens/Advertisement/EditAd"
import { UserProvider } from "../providers/UserProvider"
import { ChatConversation, chatConversationOptions } from "../screens/Chat/ChatConversation"

const HomeStack = createStackNavigator()

export const HomeStackScreen = () => {
  return (
    <UserProvider>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name={r.home.name}
          component={HomeScreen}
          options={props => ({
            ...defaultNavigationOptions,
            ...homeScreenOptions(props),
          })}
        />
        <HomeStack.Screen
          name={r.advertisementDetails.name}
          component={AdvertisementDetails}
          options={{
            ...defaultNavigationOptions,
            title: r.advertisementDetails.title,
          }}
        />
        <HomeStack.Screen
          name={r.chatConversation.name}
          component={ChatConversation}
          options={props => ({
            ...defaultNavigationOptions,
            ...chatConversationOptions(props)
          })}
        />
        <HomeStack.Screen
          name={r.editAd.name}
          component={EditAdScreen}
          options={{ title: r.editAd.title, ...defaultNavigationOptions }}
        />
        <HomeStack.Screen
          name={r.chat.name}
          component={Chat}
          options={{ title: r.chat.title, ...defaultNavigationOptions }}
        />
        <HomeStack.Screen
          name={r.favorites.name}
          component={Favorites}
          options={{ title: r.favorites.title, ...defaultNavigationOptions }}
        />
      </HomeStack.Navigator>
    </UserProvider>
  )
}