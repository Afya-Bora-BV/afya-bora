import React from 'react';

import HomeView from './Home';
import ScheduleView from './Schedule';
import ChatView from './Chat';
import ProfileView from './Profile/MainScreen';
import TabHomeIcon from '../../assets/icons/TabHomeIcon';
import TabScheduleIcon from '../../assets/icons/TabScheduleIcon';
import TabChatIcon from '../../assets/icons/TabChatIcon';
import TabProfileIcon from '../../assets/icons/TabProfileIcon';

import {Tab, TabNavKey} from './_navigator';

export default function PatientAppView () {
	return (
		<Tab.Navigator
			lazy
			initialRouteName={TabNavKey.HomeView}
			tabBarOptions={{
				activeTintColor: "#561BB3",
				inactiveTintColor: "#B0B3C7",
			}}
		>
			<Tab.Screen
				name={TabNavKey.HomeView}
				component={HomeView}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<TabHomeIcon size={8} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name={TabNavKey.ScheduleView}
				component={ScheduleView}
				options={{
					tabBarLabel: "Schedule",
					tabBarIcon: ({ color, size }) => (
						<TabScheduleIcon size={8} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name={TabNavKey.ChatView}
				component={ChatView}
				options={{
					tabBarLabel: "Chat",
					tabBarIcon: ({ color, size }) => (
						<TabChatIcon size={8} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name={TabNavKey.Profile}
				component={ProfileView}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<TabProfileIcon size={8} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
