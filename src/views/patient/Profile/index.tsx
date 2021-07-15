import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "./Profile";
import MainProfileScreen from "./MainScreen";

import { ProfileNavKey, Stack } from './_navigator'

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
		</Stack.Navigator>
	);
}
