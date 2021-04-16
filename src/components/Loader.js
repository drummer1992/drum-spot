import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Color as c } from '../constants/app'

export const Loader = ({ children, loaded, loading, error }) => {
  if (loading && !loaded && !error) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={c.primary}
          size="large"
        />
      </View>
    )
  }

  return children
}

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
  }
})