import React from "react"
import { HeaderButton } from 'react-navigation-header-buttons'
import { Platform } from 'react-native'
import { Color as c } from "../../constants/app"

export const HeaderIcon = ({ IconComponent, ...props }) =>
  <HeaderButton
    {...props}
    IconComponent={IconComponent}
    color={Platform.select({
      android: '#fff',
      ios    : c.primary,
    })}
    iconSize={24}
  />