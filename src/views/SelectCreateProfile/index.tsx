import React from 'react'
import CreateProfileView from './CreateProfile'
import ChooseProfile from './ChooseProfile'
import auth from '@react-native-firebase/auth';


import { createStackNavigator } from "@react-navigation/stack"

export const Stack = createStackNavigator()

export const ProfileNavKeys = {
    CreateProfileScreen: "CreateProfileView",
    ChooseProfileScreen: "ChooseProfileScreen"
}

export default function ProfileView() {
    const user = auth().currentUser
    console.log("Curren user : ", user)
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen name={ProfileNavKeys.ChooseProfileScreen} component={ChooseProfile} />
            <Stack.Screen name={ProfileNavKeys.CreateProfileScreen} component={CreateProfileView} />

        </Stack.Navigator>
    )
}
