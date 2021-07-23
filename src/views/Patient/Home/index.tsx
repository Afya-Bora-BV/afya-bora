import React from "react";

import HomeScreen from "./HomeScreen";
import BookAppointmentView from "./BookAppointment";
import OnlineConsultView from "./OnlineConsult";
import MapFaciltyView from "./MapFacility";
import NotificationScreen from "./Notification";

import { NavStack, HomeNavKey } from './_navigator'
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { TabNavKey as MainTabNavKey } from '../_navigator'
import { ProfileNavKey } from '../Profile/_navigator'
import { useAuthStore } from "../../../internals/auth/context";
import AppointmentInfo from "./AppointmentInfo";
import EditAppointment from "./EditAppointment";

export default function HomeView({ navigation }: any) {
	const currentProfile = useAuthStore(s => s.currentProfile)

	useEffect(() => {
		// check if the user profile exists
		if (currentProfile !== undefined) {
			if (currentProfile.profile !== undefined) { return; }

			// Navigate if the home screen is missing
			navigation.navigate(MainTabNavKey.Profile, {
				screen: ProfileNavKey.ProfileScreen,
				// params: {
				// 	screen: ProfileNavKey.CreateProfile
				// }
			})
		}
	}, [currentProfile])

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
				name={HomeNavKey.BookAppointmentViewScreen}
				component={BookAppointmentView}
			/>
			<NavStack.Screen
				name={HomeNavKey.OnlineConsultViewScreen}
				component={OnlineConsultView}
			/>
			<NavStack.Screen
				name={HomeNavKey.MapFaciltyViewScreen}
				component={MapFaciltyView}
			/>
			<NavStack.Screen
				name={HomeNavKey.AppointmentInfoScreen}
				component={AppointmentInfo}
			/>
			<NavStack.Screen
				name={HomeNavKey.EditAppointment}
				component={EditAppointment}
			/>
		</NavStack.Navigator>
	);
}
