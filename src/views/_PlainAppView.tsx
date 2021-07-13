import React from 'react'

import { createStackNavigator } from "@react-navigation/stack"
import { Container, Text, View } from "native-base"
import LoginScreen from '../screens/Login'
import SignUpView from './SignUp'

const NavStack = createStackNavigator()

export const NavKey = {
    LoginScreen: "Login",
    SignUpViewScreen: "AuthSignUp"
}

export default function PlainAppView() {
    return (
        <NavStack.Navigator
            headerMode="none"
        >
            <NavStack.Screen name={NavKey.LoginScreen} component={LoginScreen} />
            <NavStack.Screen name={NavKey.SignUpViewScreen} component={SignUpView} />
        </NavStack.Navigator>
    )
}
