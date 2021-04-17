import { Route as r } from "../constants/app"
import { CreateAdScreen } from "../screens/Advertisement/CreateAd"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { defaultNavigationOptions } from "./common"

const CreateAdStack = createStackNavigator()

export const CreateAdStackScreen = () => {
  return (
    <CreateAdStack.Navigator>
      <CreateAdStack.Screen
        name={r.createAd.name}
        component={CreateAdScreen}
        options={{
          title: r.createAd.title,
          ...defaultNavigationOptions,
        }}
      />
    </CreateAdStack.Navigator>
  )
}