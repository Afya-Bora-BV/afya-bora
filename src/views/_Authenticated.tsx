import React from 'react'

import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeView from './Home'

const Tab = createBottomTabNavigator()

export const TabNavKey = {
    HomeView: "Home",
    ScheduleView: "Schedule",
    ChatView: "Chats",
    Profile: "Profile"
}

export default function AuthenticatedAppView() {
    return (
        <Tab.Navigator>
            <Tab.Screen name={TabNavKey.HomeView} component={HomeView} />
            <Tab.Screen name={TabNavKey.ScheduleView} component={HomeView} />
            <Tab.Screen name={TabNavKey.ChatView} component={HomeView} />
            <Tab.Screen name={TabNavKey.Profile} component={HomeView} />
        </Tab.Navigator>
    )
}
