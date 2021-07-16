import React from 'react'

import LoginView from './Login'
import SignUpView from './SignUp'

import { NavKey, Stack as NavStack } from './_navigator'

export default function PlainAppView() {
    return (
        <NavStack.Navigator
            headerMode="none"
            initialRouteName={NavKey.SignUpViewScreen}
        >
            <NavStack.Screen name={NavKey.LoginScreen} component={LoginView} />
            <NavStack.Screen name={NavKey.SignUpViewScreen} component={SignUpView} />
        </NavStack.Navigator>
    )
}
