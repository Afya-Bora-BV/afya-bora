import React from 'react'

import { createStackNavigator } from "@react-navigation/stack"
import { Container, Text, View } from "native-base"
import HomeScreen from '../screens/Home'
import SignUpView from './SignUp'
import OnlineConsultantSelectConsultantScreen from '../screens/OnlineConsultantSelectConsultant'

const NavStack = createStackNavigator()

export const NavKey = {
    HomeScreen: "HomeScreen",
    BookAppointmentScreen: "BookAppointmentScreen"
}

export default function AuthenticatedAppView() {
    return (
        <NavStack.Navigator
            headerMode="none"
        >
            <NavStack.Screen name={NavKey.HomeScreen} component={HomeScreen} />
            <NavStack.Screen name={NavKey.BookAppointmentScreen} component={OnlineConsultantSelectConsultantScreen} />
        </NavStack.Navigator>
    )
}
