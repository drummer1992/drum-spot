import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Color as c, Route as r } from "../constants/app"
import { Text } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { HomeStackScreen } from "./HomeNavigation"
import { CreateAdStackScreen } from "./CreateAdNavigation"
import { ProfileStackScreen } from "./ProfileNavigation"
import { selectUser } from "../redux/reducers/user"
import { useSelector } from "react-redux"
import { createGuard } from "../utils/guard"

const Tab = createBottomTabNavigator()

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

export const Navigation = () => {
  const user = useSelector(selectUser)
  const guard = createGuard(user?._id)

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
        {guard(
          <Tab.Screen
            name={r.createAd.name}
            component={CreateAdStackScreen}
            options={tabBarIconOptions({
              title        : r.createAd.title,
              name         : 'plus-circle',
              IconComponent: MaterialCommunityIcons
            })}
          />
        )}
        <Tab.Screen
          name={r.profile.name}
          component={ProfileStackScreen}
          options={tabBarIconOptions({
            title        : r.profile.title,
            name         : 'account',
            IconComponent: MaterialCommunityIcons,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
