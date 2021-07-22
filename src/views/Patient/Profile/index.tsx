import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import ProfileScreen from "./Profile";
import MainProfileScreen from "./MainScreen";
import EditHealthProfile from "./EditHealthProfile";

import { ProfileNavKey, Stack } from "./_navigator";
import VisitHistory from "./VisitHistory";

export default function ProfileView({ navigation }: any) {
	
	// useEffect(() => {
	// 	navigation.navigate(MainTabNavKey.Profile, {
	// 		screen: ProfileNavKey.ProfileScreen,
	// 		// params: {
	// 		// 	screen: ProfileNavKey.CreateProfile
	// 		// }
	// 	});
	// });

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
				name={ProfileNavKey.EditHealthProfile}
				component={EditHealthProfile}
			/>
			<Stack.Screen
				name={ProfileNavKey.VisitHistory}
				component={VisitHistory}
			/>
		</Stack.Navigator>
	);
}
