import React from "react";
import ConsultantsList from "./ConsultantsList";
import { PatientComplaint } from "./PatientComplaint";
import SetAppointmentTime from "./SetAppointmentTime";

import { Stack, NavKey } from './_navigator'

export default function BookAppointment() {
	return (
		<Stack.Navigator 
			headerMode="none"
			// initialRouteName={NavKey.SetAppointmentTimeScreen}
		>
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
