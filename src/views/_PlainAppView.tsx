import React from 'react'

import { createStackNavigator } from "@react-navigation/stack"
import { Container, Stack, Text, View } from "native-base"

const NavStack = createStackNavigator()

function _PlainAppView() {
    return (
        <NavStack.Navigator
            headerMode="none"        
        >
            <NavStack.Screen name="LoginScreen" component={() => <></>} />
        </NavStack.Navigator>
    )
}

export default function PlainAppView() {
    return (
        <Container flex={1} width="100%">
            <View flex={1} justifyContent="center" alignItems="center" width="100%">
                <Text alignSelf="center">Not Authenticated!</Text>
            </View>
        </Container>
    )
}