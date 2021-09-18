import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useRootStore } from '../models/root-store-provider';

const Login = () => {

    const { user, todos } = useRootStore();

    const loginHandler = () => {
        console.log(todos)
        //user.logIn('01723144515', '123456');
        addTodo(345345);
      }
      
      console.log(user.isLoggedIn)
      
    return (
        <View>
            <Button title="Login" onPress={loginHandler} />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})
