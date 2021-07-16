import React from 'react'
import SignUpScreen from './SignUpScreen'
import VerifyScreen from './VerifyScreen'

import { Stack, NavKey } from './_navigator'

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
