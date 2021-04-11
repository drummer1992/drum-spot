import React from "react"
import { getCellHeight } from "../utils/device"
import { Advertisement } from "./Advertisement"
import { FlatList, StyleSheet } from "react-native"


const GAP = 6
const BOTTOM_BAR_HEIGHT = 46

const styles = StyleSheet.create({
  advertisement: {
    height        : getCellHeight(3, GAP, BOTTOM_BAR_HEIGHT),
    marginVertical: GAP,
  }
})

export const AdvertisementList = ({ data }) => {
  const renderItem = ({ item }) => <Advertisement {...item} style={styles.advertisement}/>

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, i) => `advertisement-${i}`}
    />
  )
}