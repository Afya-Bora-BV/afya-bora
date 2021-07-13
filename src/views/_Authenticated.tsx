import React from 'react'

import { createStackNavigator } from "@react-navigation/stack"
import { Container, Text, View } from "native-base"
import HomeScreen from './Home'
import BookAppointmentView from './BookAppointment'
import OnlineConsultView from './OnlineConsult'

const NavStack = createStackNavigator()

export const NavKey = {
    HomeScreen: "HomeScreen",
    BookAppointmentViewScreen: "BookAppointmentView",
    OnlineConsultViewScreen: "OnlineConsultView",
}

export default function AuthenticatedAppView() {
    return (
        <NavStack.Navigator
            headerMode="none"
        >
            <NavStack.Screen name={NavKey.HomeScreen} component={HomeScreen} />
            <NavStack.Screen name={NavKey.BookAppointmentViewScreen} component={BookAppointmentView} />
            <NavStack.Screen name={NavKey.OnlineConsultViewScreen} component={OnlineConsultView} />
        </NavStack.Navigator>
    )
}
