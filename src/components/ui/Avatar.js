import React from 'react'
import { Image } from 'react-native'

const Avatar = ({
  src,
  size,
  imageStyle,
  borderRadius,
}) => {

  return <Image source={src} style={{
    borderRadius : borderRadius ? borderRadius : (size * 0.5),
    width        : size,
    height       : size,
    ...imageStyle || {},
  }
  }/>
}

export default Avatar
