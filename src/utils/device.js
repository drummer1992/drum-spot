import { Dimensions, Platform } from 'react-native'


export const DEVICE_WIDTH = Dimensions.get('window').width
export const DEVICE_HEIGHT = Dimensions.get('window').height

export const getCellHeight = (countOfCells, gap, exclude = 0) => {
  return ((DEVICE_HEIGHT - Platform.select({ ios: 64, android: 56 }) - exclude) / countOfCells) - (gap ? gap * 2 : 0)
}