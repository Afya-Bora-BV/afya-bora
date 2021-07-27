import React from "react";

import HomeScreen from "./HomeScreen";
import AppointmentInfoScreen from "./AppointmentInfo";
import NotificationScreen from "./Notification";
import DoctorVideoScreen from "./DoctorVideoCall";

import { NavStack, HomeNavKey } from './_navigator'

export default function HomeView() {
	return (
		<NavStack.Navigator headerMode="none">
			<NavStack.Screen
				name={HomeNavKey.HomeScreen}
				component={HomeScreen}
			/>
			<NavStack.Screen
				name={HomeNavKey.NotificationScreen}
				component={NotificationScreen}
			/>
			<NavStack.Screen
				name={HomeNavKey.AppointmentInfoScreen}
				component={AppointmentInfoScreen}
			/>
			<NavStack.Screen
				name={HomeNavKey.DoctorVideoCallScreen}
				component={DoctorVideoScreen}
			/>
		</NavStack.Navigator>
	);
}
