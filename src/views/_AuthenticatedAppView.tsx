import React from 'react'

import { createStackNavigator } from "@react-navigation/stack"
import { Container, Text, View } from "native-base"

const NavStack = createStackNavigator()

function AppView() {
    return (
        <Container flex={1} width="100%">
            <View flex={1} justifyContent="center" alignItems="center" width="100%">
                <Text alignSelf="center">Logged In!</Text>
            </View>
        </Container>
    )
}

export default function AuthenticatedAppView() {
    return (
        <NavStack.Navigator
            headerMode="none"
        >
            <NavStack.Screen name="LoginScreen" component={AppView} />
        </NavStack.Navigator>
    )
}