import React from "react";

import HomeScreen from "./HomeScreen";
import FacilityList from "./FacilityList";
import AppointmentTime from "./AppointmentTime";
import FacilityMap from "./FacilityMap";
import FacilityInfo from "./FacilityInfo";
import AppointmentInvoice from "./AppointmentInvoice";
import Login from "./Login";
import CreateProfile from "./CreateProfile";
import ChooseProfile from "./ChooseProfile";
import Profile from "./Profile";
import Notification from "./Notification";
import EditHealthProfile from "./EditHealthProfile";
import AppointmentInfo from "./AppointmentInfo";

import { PatientComplaint } from "./PatientComplaint";
import { createStackNavigator } from "@react-navigation/stack";
import VisitHistory from "./VisitHistory";
import UpcomingAppointments from "./UpcomingAppointments";

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
	ChooseProfile: "ChooseProfile",
	Profile: "Profile",
	Notification: "Notification",
	VisitHistory: "VisitHistory",
	EditHealthProfile: "EditHealthProfile",
	UpcomingAppointments: "UpcomingAppointments",
	AppointmentInfo: "AppointmentInfo"
};

export default function HomeView({ navigation }: any) {
	return (
		<NavStack.Navigator headerMode="none"
			initialRouteName={HomeNavKey.HomeScreen}
		>
			<NavStack.Screen name={HomeNavKey.Profile} component={Profile} />
			<NavStack.Screen name={HomeNavKey.Login} component={Login} />
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
				name={HomeNavKey.ChooseProfile}
				component={ChooseProfile}
			/>
			<NavStack.Screen
				name={HomeNavKey.CreateProfile}
				component={CreateProfile}
			/>

			<NavStack.Screen
				name={HomeNavKey.Notification}
				component={Notification}
			/>
			<NavStack.Screen
				name={HomeNavKey.VisitHistory}
				component={VisitHistory}
			/>

			<NavStack.Screen
				name={HomeNavKey.UpcomingAppointments}
				component={UpcomingAppointments}
			/>
			<NavStack.Screen
				name={HomeNavKey.EditHealthProfile}
				component={EditHealthProfile}
			/>

			<NavStack.Screen
				name={HomeNavKey.AppointmentInfo}
				component={AppointmentInfo}
			/>
		</NavStack.Navigator>
	);
}
