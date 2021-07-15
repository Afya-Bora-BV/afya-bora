import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AppointmentInfo from "./AppointmentInfo";
import DoctorHome from "./Home";

const Stack = createStackNavigator();

export type DoctorStackParamList = {
	SetAppointmentTime: {
		consultant: any;
	};
	PatientComplaint: {
		consultant: any;
		appointment: any;
	};
};

export const NavKey = {
	HomeScreen: "DoctorHome",
	AppointmentInfoScreen: "AppointmentInfo",
};

export default function BookAppointment() {
	return (
		<Stack.Navigator
			headerMode="none"
			// initialRouteName={NavKey.SetAppointmentTimeScreen}
		>
			<Stack.Screen name={NavKey.HomeScreen} component={DoctorHome} />
			<Stack.Screen
				name={NavKey.AppointmentInfoScreen}
				component={AppointmentInfo}
			/>
		</Stack.Navigator>
	);
}
