import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from '../../screens/SignUp'
import VerifyScreen from '../../screens/Verify'

const Stack = createStackNavigator()

export const NavKey = {
    SignUpScreen: "signUpScreen",
    VerifyScreen: "verifyScreen"
}

export default function SignUpView () {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen name={NavKey.SignUpScreen} component={SignUpScreen}/>
            <Stack.Screen name={NavKey.VerifyScreen} component={VerifyScreen}/>
        </Stack.Navigator>
    )
}
