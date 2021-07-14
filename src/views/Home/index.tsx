import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./HomeScreen";
import BookAppointmentView from "./BookAppointment";
import OnlineConsultView from "./OnlineConsult";
import MapFaciltyView from "./MapFacility";

const NavStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeNavKey = {
	HomeScreen: "HomeScreen",
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
