import { Route as r } from "../constants/app"
import { Profile } from "../screens/Profile/Profile"
import { About } from "../screens/Profile/About"
import { Chat } from "../screens/Chat/Chat"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { defaultNavigationOptions } from "./common"
import { OwnAdvertisements } from "../screens/Profile/OwnAdvertisements"
import { EditAdScreen } from "../screens/Advertisement/EditAd"

const ProfileStack = createStackNavigator()

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={r.profile.name}
        component={Profile}
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
        name={r.ownAdvertisements.name}
        component={OwnAdvertisements}
        options={{ title: r.ownAdvertisements.title, ...defaultNavigationOptions }}
      />
      <ProfileStack.Screen
        name={r.editAd.name}
        component={EditAdScreen}
        options={{ title: r.editAd.title, ...defaultNavigationOptions }}
      />
    </ProfileStack.Navigator>
  )
}