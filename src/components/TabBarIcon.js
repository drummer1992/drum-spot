import React from "react"

export const TabBarIcon = ({ focused, size, color, name, IconComponent }) => {
  const iconName = `${name}${!focused ? '-outline' : ''}`

  return <IconComponent size={size} name={iconName} color={color}/>
}