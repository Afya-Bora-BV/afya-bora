import React from "react";

import HomeScreen from "./HomeScreen";
import FacilityList from "./FacilityList";
import AppointmentTime from "./AppointmentTime"
import FacilityMap from './FacilityMap'
import FacilityInfo from "./FacilityInfo";
import AppointmentInvoice from "./AppointmentInvoice"
import Login from "./Login"
import CreateProfile from "./CreateProfile"
import ChooseProfile from "./ChooseProfile"

import { PatientComplaint } from "./PatientComplaint";
import { createStackNavigator } from "@react-navigation/stack";

export const NavStack = createStackNavigator();

export const HomeNavKey = {
	HomeScreen: "HomeScreen",
	ConsultantList: "ConsultantList",
	AppointmentTime: "AppointmentTime",
	FacilityMap: "FacilityMap",
	FacilityInfo: "FacilityInfo",
	EditAppointment: "EditAppointment",
	PatientComplaint: "PatientComplaint",
	AppointmentInvoice: "AppointmentInvoice",
	Login: "Login",
	CreateProfile: "CreateProfile",
	ChooseProfile: "ChooseProfile"
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
				component={FacilityList}
			/>
			<NavStack.Screen
				name={HomeNavKey.AppointmentTime}
				component={AppointmentTime}
			/>
			<NavStack.Screen
				name={HomeNavKey.FacilityMap}
				component={FacilityMap}
			/>
			<NavStack.Screen
				name={HomeNavKey.FacilityInfo}
				component={FacilityInfo}
			/>
			<NavStack.Screen
				name={HomeNavKey.PatientComplaint}
				component={PatientComplaint}
			/>
			<NavStack.Screen
				name={HomeNavKey.AppointmentInvoice}
				component={AppointmentInvoice}
			/>

			<NavStack.Screen
				name={HomeNavKey.Login}
				component={Login}
			/>
			<NavStack.Screen
				name={HomeNavKey.ChooseProfile}
				component={ChooseProfile}
			/>
			<NavStack.Screen
				name={HomeNavKey.CreateProfile}
				component={CreateProfile}
			/>
		</NavStack.Navigator>
	);
}
