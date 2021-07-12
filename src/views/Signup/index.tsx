import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SignUpScreen from './SignUpScreen'
import VerifyScreen from './VerifyScreen'

const Stack = createStackNavigator()

export default function SignUp () {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen name="signUp" component={SignUpScreen} />
            <Stack.Screen name="verifyScreen" component={VerifyScreen} />
        </Stack.Navigator>
    )
}
