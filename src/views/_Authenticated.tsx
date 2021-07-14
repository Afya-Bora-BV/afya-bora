import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeView from './Home'
import ScheduleView from './Schedule'
import ChatView from './Chat'
import ProfileView from './Profile'

const Tab = createBottomTabNavigator()

export const TabNavKey = {
    HomeView: "Home",
    ScheduleView: "Schedule",
    ChatView: "Chats",
    Profile: "Profile"
}

export default function AuthenticatedAppView() {
    return (
        <Tab.Navigator lazy>
            <Tab.Screen name={TabNavKey.HomeView} component={HomeView} />
            <Tab.Screen name={TabNavKey.ScheduleView} component={ScheduleView} />
            <Tab.Screen name={TabNavKey.ChatView} component={ChatView} />
            <Tab.Screen name={TabNavKey.Profile} component={ProfileView} />
        </Tab.Navigator>
    )
}
