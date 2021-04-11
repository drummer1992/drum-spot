import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Color as c, Route as r } from "../constants/app"
import { HomeScreen, homeScreenOptions } from "../screens/Home"
import { CreateAdScreen } from "../screens/CreateAd"
import { Platform, Text } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { TabBarIcon } from "../components/TabBarIcon"
import { Chat } from "../screens/Chat"
import { Favorites } from "../screens/Favorites"

const HomeStack = createStackNavigator()
const CreateAdStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const defaultNavigationOptions = {
  headerStyle    : {
    backgroundColor: Platform.select({
      android: c.primary,
      ios    : '#fff',
    })
  },
  headerTintColor: Platform.select({
    android: '#fff',
    ios    : c.primary,
  }),
}

const tabBarIconOptions = ({ title, IconComponent, name }) => ({
  tabBarLabel: () => (
    <Text style={{ color: c.primary }}>{title}</Text>
  ),
  tabBarIcon : props => <TabBarIcon
    IconComponent={IconComponent}
    name={name}
    {...props}
    color={c.primary}
  />
})

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={r.home.name}
        component={HomeScreen}
        options={props => ({
          ...homeScreenOptions(props),
          ...defaultNavigationOptions,
        })}
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
  )
}

const CreateAdStackScreen = () => {
  return (
    <CreateAdStack.Navigator>
      <CreateAdStack.Screen
        name={r.createAd.name}
        component={CreateAdScreen}
        options={{ title: r.createAd.title, ...defaultNavigationOptions }}
        />
    </CreateAdStack.Navigator>
  )
}

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={r.home.name}>
        <Tab.Screen
          name={r.home.name}
          component={HomeStackScreen}
          options={tabBarIconOptions({
            title        : r.home.title,
            name         : 'home-circle',
            IconComponent: MaterialCommunityIcons,
          })}
        />
        <Tab.Screen
          name={r.createAd.name}
          component={CreateAdStackScreen}
          options={tabBarIconOptions({
            title        : r.createAd.title,
            name         : 'plus-circle',
            IconComponent: MaterialCommunityIcons
          })}
        />
        <Tab.Screen
          name={r.ownAdvertisements.name}
          component={HomeStackScreen}
          options={tabBarIconOptions({
            title        : r.ownAdvertisements.title,
            name         : 'clipboard',
            IconComponent: Ionicons,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}