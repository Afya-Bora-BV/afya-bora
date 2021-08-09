import React from "react";

import HomeScreen from "./HomeScreen";
import ConsultantsList from "./ConsultantsList";
import AppointmentTime from "./AppointmentTime"
import { createStackNavigator } from "@react-navigation/stack";

export const NavStack = createStackNavigator();

export const HomeNavKey = {
	HomeScreen: "HomeScreen",
	ConsultantList: "ConsultantList",
	AppointmentTime: "AppointmentTime",
	MapFaciltyViewScreen: "MapFaciltyView",
	AppointmentInfoScreen: "AppointmentInfo",
	EditAppointment: "EditAppointment",
	PatientVideoCallScreen: "PatientVideoCallScreen"
};


export default function HomeView({ navigation }: any) {

	return (
		<NavStack.Navigator headerMode="none">
			<NavStack.Screen
				name={HomeNavKey.HomeScreen}
				component={HomeScreen}
			/>
			<NavStack.Screen
				name={HomeNavKey.ConsultantList}
				component={ConsultantsList}
			/>
			<NavStack.Screen
				name={HomeNavKey.AppointmentTime}
				component={AppointmentTime}
			/>
			{/* <NavStack.Screen
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
			/> */}
		</NavStack.Navigator>
	);
}
