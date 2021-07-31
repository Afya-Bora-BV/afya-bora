import React from 'react'
import LoginView from './Login'
import LoginDoctorView from './LoginDoctor'

import { NavKey, Stack as NavStack } from './_navigator'

export default function PlainAppView() {
    return (
        <NavStack.Navigator
            headerMode="none"
        >
            <NavStack.Screen name={NavKey.LoginScreen} component={LoginView} />
            <NavStack.Screen name={NavKey.LoginDoctorScreen} component={LoginDoctorView} />
        </NavStack.Navigator>
    )
}
