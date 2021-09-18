import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { RootStoreProvider } from './src/models/root-store-provider';
import Login from './src/screens/Login';





const App = () => {

  
  return (
    <RootStoreProvider>
      <View>
        <Text>Mobx Todo</Text>
        <Login />
      </View>
    </RootStoreProvider>

  )
}

export default App

const styles = StyleSheet.create({})
