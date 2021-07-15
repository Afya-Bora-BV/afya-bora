import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import BookAppointmentView from "./BookAppointment";
import OnlineConsultView from "./OnlineConsult";
import MapFaciltyView from "./MapFacility";
import NotificationScreen from "./Notification";

const NavStack = createStackNavigator();

export const HomeNavKey = {
	HomeScreen: "HomeScreen",
	NotificationScreen: "NotificationScreen",
	BookAppointmentViewScreen: "BookAppointmentView",
	OnlineConsultViewScreen: "OnlineConsultView",
	MapFaciltyViewScreen: "MapFaciltyView",
};

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
		</NavStack.Navigator>
	);
}
