import React from "react";

import HomeScreen from "./HomeScreen";
import BookAppointmentView from "./BookAppointment";
import OnlineConsultView from "./OnlineConsult";
import MapFaciltyView from "./MapFacility";
import NotificationScreen from "./Notification";
import { NavStack, HomeNavKey } from './_navigator'
import AppointmentInfo from "./AppointmentInfo";
import EditAppointment from "./EditAppointment";

import ConsultantsList from "./BookAppointment/ConsultantsList";

export default function HomeView({ navigation }: any) {


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
				name={HomeNavKey.ConsultantList}
				component={ConsultantsList}
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
