import { Route as r } from "../constants/app"
import { Profile } from "../screens/Profile/Profile"
import { About } from "../screens/Profile/About"
import { Chat } from "../screens/Chat/Chat"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { defaultNavigationOptions } from "./common"
import { OwnAdvertisements } from "../screens/Profile/OwnAdvertisements"
import { EditAdScreen } from "../screens/Advertisement/EditAd"
import { AdvertisementDetails, advertisementOptions } from "../screens/Advertisement/AdvertisementDetails"
import { UserProvider } from "../providers/UserProvider"

const ProfileStack = createStackNavigator()

export const ProfileStackScreen = () => {
  return (
    <UserProvider>
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
        <ProfileStack.Screen
          name={r.advertisementDetails.name}
          component={AdvertisementDetails}
          options={props => ({
            ...defaultNavigationOptions,
            ...advertisementOptions(props),
          })}
        />
      </ProfileStack.Navigator>
    </UserProvider>
  )
}