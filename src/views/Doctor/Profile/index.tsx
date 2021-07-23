import React from "react";
import ProfileScreen from "./Profile";
import MainProfileScreen from "./MainScreen";
import CreateProfileScreen from "./CreateProfile";

import { ProfileNavKey, Stack } from './_navigator'
import UpcomingAppointments from "./UpcomingAppointments";

export default function ProfileView() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen
				name={ProfileNavKey.MainScreen}
				component={MainProfileScreen}
			/>
			<Stack.Screen
				name={ProfileNavKey.ProfileScreen}
				component={ProfileScreen}
			/>
			<Stack.Screen
				name={ProfileNavKey.CreateProfile}
				component={CreateProfileScreen}
			/>
			<Stack.Screen
				name={ProfileNavKey.UpcomingAppointments}
				component={UpcomingAppointments}
			/>
		</Stack.Navigator>
	);
}
