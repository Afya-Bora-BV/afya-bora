import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ConsultantsList from "./ConsultantsList";
import { PatientComplaint } from "./PatientComplaint";
import SetAppointmentTime from "./SetAppointmentTime";

const Stack = createStackNavigator();

export const NavKey = {
	ConsultantListScreen: "ConsultantList",
	SetAppointmentTimeScreen: "SetAppointmentTime",
	PatientComplaintScreen: "PatientComplaint",
};

export default function BookAppointment() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen
				name={NavKey.ConsultantListScreen}
				component={ConsultantsList}
			/>
			<Stack.Screen
				name={NavKey.SetAppointmentTimeScreen}
				component={SetAppointmentTime}
			/>
			<Stack.Screen
				name={NavKey.PatientComplaintScreen}
				component={PatientComplaint}
			/>
		</Stack.Navigator>
	);
}
