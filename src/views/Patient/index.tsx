import React from 'react';

import HomeView from './Home';
import ScheduleView from './Schedule';
import ProfileView from './Profile';

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
