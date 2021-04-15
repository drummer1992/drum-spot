import React from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Color as c } from "../../constants/app"
import identity from 'lodash/identity'

const defaultWidth = 98 / 100 * Dimensions.get('window').width

export function ImageSlider({
  images,
  ContainerStyle = {},
  ScrollStyle = {},
  ImageStyle = {},
  onLongPress = identity,
  active,
  setActive,
  resizeMode,
}) {
  const styles = getStyles(ContainerStyle)

  const handleScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)

    if (slide !== active) {
      setActive(slide)
    }
  }

  return (
    <View style={{ ...styles.container, ...ContainerStyle }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={{ ...styles.scroll, ...ScrollStyle }}
        onScroll={handleScroll}
        scrollEventThrottle={1}
      >
        {
          images.map((img, i) => (
            <TouchableOpacity
              key={`image-${i}`}
              onLongPress={() => onLongPress(active)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: img }}
                style={{ ...styles.image, ...ImageStyle }}
                resizeMode={resizeMode}
              />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      <View style={styles.pagination}>
        {
          images.map((_, i) => (
              <Text key={`image-dot-${i}`} style={i === active ? styles.pagingActiveText : styles.pagingText}>
                ⬤
              </Text>
            )
          )
        }
      </View>
    </View>
  )
}

const getStyles = ({
  width = defaultWidth,
  height = '100%',
}) => StyleSheet.create({
  container       : { width, height },
  scroll          : { width, height },
  image           : { width, height },
  pagination      : {
    flexDirection: 'row',
    position     : 'absolute',
    bottom       : 0,
    alignSelf    : 'center',
  },
  pagingText      : { fontSize: (width / 30), color: '#e5e5e5', margin: 3 },
  pagingActiveText: { fontSize: (width / 30), color: c.primary, margin: 3 },
})
