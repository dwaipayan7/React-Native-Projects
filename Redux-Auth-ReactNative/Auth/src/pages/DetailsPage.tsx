import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailsPage = () => {
  return (
    <View style = {styles.container}>
      <Text>DetailsPage</Text>
    </View>
  )
}

export default DetailsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})