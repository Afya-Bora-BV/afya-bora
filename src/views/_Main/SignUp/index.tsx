import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from './SignUpScreen'
import VerifyScreen from './VerifyScreen'

const Stack = createStackNavigator()

export const NavKey = {
    SignUpScreen: "signUpScreen",
    VerifyScreen: "verifyScreen"
}

export default function SignUpView () {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName={NavKey.VerifyScreen}
        >
            <Stack.Screen name={NavKey.SignUpScreen} component={SignUpScreen}/>
            <Stack.Screen name={NavKey.VerifyScreen} component={VerifyScreen}/>
        </Stack.Navigator>
    )
}
