import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "./Profile";
import MainProfileScreen from "./MainScreen";

const Stack = createStackNavigator();

export type ProfileStackParamList = {};

export const ProfileNavKey = {
	MainScreen: "Profile.MainScreen",
	ProfileScreen: "Profile.ProfileScreen",
};

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
