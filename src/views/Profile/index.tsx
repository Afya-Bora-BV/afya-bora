import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Profile from "./Profile";
import ProfileMain from "./MainScreen";

const Stack = createStackNavigator();

export type ProfileStackParamList = {};

export const ProfileNavKey = {
	MainScreen: "ProfileMain",
	ProfileScreen: "Profile",
};

export default function ProfileView() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen
				name={ProfileNavKey.MainScreen}
				component={ProfileMain}
			/>
			<Stack.Screen
				name={ProfileNavKey.ProfileScreen}
				component={Profile}
			/>
		</Stack.Navigator>
	);
}
