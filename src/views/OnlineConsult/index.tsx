import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import OnlineConsultantSelectDateTime from './OnlineConsultantSelectDateTime'
import OnlineConsultChooseConsultant from './OnlineConsultChooseConsultant'


const Stack = createStackNavigator()

export const NavKey = {
    SelectDateTimeScreen: "OnlineConsultantSelectDateTime",
    ChooseConsultantScreen: "OnlineConsultChooseConsultant",
}


export default function BookAppointment() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name={NavKey.SelectDateTimeScreen} component={OnlineConsultantSelectDateTime} />
            <Stack.Screen name={NavKey.ChooseConsultantScreen} component={OnlineConsultChooseConsultant} />
        </Stack.Navigator>
    )
}