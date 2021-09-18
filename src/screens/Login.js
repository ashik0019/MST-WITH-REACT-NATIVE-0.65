import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useRootStore } from '../models/root-store-provider';

const Login = () => {

    const { user, todos, addTodo, todosArr } = useRootStore();

    const loginHandler = () => {
        console.log(todosArr.length)
        //user.logIn('01723144515', '123456');
        let todo1 = {
            id: todosArr.length + 1,
            name: 'safwan ' + todosArr.length + 1
        }
        addTodo(todo1);
    }

   

    return (
        <View>
            <Button title="Add More" onPress={loginHandler} />

            {
                todosArr.map((item, index) => <Text key={item.id}> {item.name}</Text>)
            }
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    battonStyle: {
        marginTop: 10,
    }
})
