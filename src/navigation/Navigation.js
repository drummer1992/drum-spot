import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Color as c, Route as r } from "../constants/app"
import { HomeScreen, homeScreenOptions } from "../screens/Home/Home"
import { CreateAdScreen } from "../screens/CreateAd/CreateAd"
import { Platform, Text } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Chat } from "../screens/Chat/Chat"
import { Favorites } from "../screens/Favorites/Favorites"
import { AdvertisementDetails, advertisementOptions } from "../screens/Home/AdvertisementDetails"
import { Profile } from "../screens/Profile/Profile"
import { About } from "../screens/Profile/About"
import { UserProvider } from "../providers/UserProvider"

const HomeStack = createStackNavigator()
const ProfileStack = createStackNavigator()
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

const TabBarIcon = ({ focused, size, color, name, IconComponent }) => {
  const iconName = `${name}${!focused ? '-outline' : ''}`

  return <IconComponent size={size} name={iconName} color={color}/>
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
          ...defaultNavigationOptions,
          ...homeScreenOptions(props),
        })}
      />
      <HomeStack.Screen
        name={r.advertisementDetails.name}
        component={AdvertisementDetails}
        options={props => ({
          ...defaultNavigationOptions,
          ...advertisementOptions(props),
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

const ProfileStackScreen = () => {
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
    </ProfileStack.Navigator>
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
      <UserProvider>
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
            component={ProfileStackScreen}
            options={tabBarIconOptions({
              title        : r.profile.title,
              name         : 'account',
              IconComponent: MaterialCommunityIcons,
            })}
          />
        </Tab.Navigator>
      </UserProvider>
    </NavigationContainer>
  )
}
