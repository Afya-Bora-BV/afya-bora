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
import EditAppointment from "./EditAppointment";

import { PatientComplaint } from "./PatientComplaint";
import { createStackNavigator } from "@react-navigation/stack";
import VisitHistory from "./VisitHistory";
import UpcomingAppointments from "./UpcomingAppointments";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import RemoteConsultation from "./RemoteConsultation";

// TODO : to organize the doctors routes and patient routes better
import DoctorLogin from "../Doctor/LoginDoctor";
import DoctorHome from "../Doctor/HomeDoctor";
import DoctorAppointmentInfo from "../Doctor/AppointmentInfoDoctor";
import DoctorRemoteConsultation from "../Doctor/RemoteConsultationDoctor";
import ConfirmAppointment from "./ConfirmAppointment";
import OnBoard from "./OnBoard";

const AuthStack = createStackNavigator();

function AuthRoutes() {
	return (
		<AuthStack.Navigator headerMode="none" initialRouteName="Login">
			<AuthStack.Screen name={HomeNavKey.Login} component={Login} />
			<AuthStack.Screen
				name={HomeNavKey.CreateProfile}
				component={CreateProfile}
			/>
		</AuthStack.Navigator>
	);
}

export const NavStack = createStackNavigator();

export const HomeNavKey = {
	HomeScreen: "HomeScreen",
	PatientComplaint: "PatientComplaint",
	ConsultantList: "ConsultantList",
	FacilityMap: "FacilityMap",
	FacilityInfo: "FacilityInfo",
	AppointmentTime: "AppointmentTime",
	EditAppointment: "EditAppointment",
	AppointmentInvoice: "AppointmentInvoice",
	Login: "Login",
	CreateProfile: "CreateProfile",
	ChooseProfile: "ChooseProfile",
	Profile: "Profile",
	Notification: "Notification",
	VisitHistory: "VisitHistory",
	EditHealthProfile: "EditHealthProfile",
	UpcomingAppointments: "UpcomingAppointments",
	AppointmentInfo: "AppointmentInfo",
	RemoteConsultation: "RemoteConsultation",
	ConfirmAppointment: "ConfirmAppointment",
	OnBoard: "OnBoard"
};

export const DoctorRoutes = {
	DoctorHome: "DoctorHome",
	DoctorLogin: "DoctorLogin",
	DoctorAppointmentInfo: "DoctorAppointmentInfo",
	DoctorRemoteConsultation: "DoctorRemoteConsultation",
};

function HomeView({ navigation, initialRouteName }: any) {
	return (
		<NavStack.Navigator
			// headerMode="none"
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName={initialRouteName}
		// initialRouteName={"Login"}
		>
			<NavStack.Screen name={HomeNavKey.OnBoard} component={OnBoard} />
			
			<NavStack.Screen name={HomeNavKey.Profile} component={Profile} />
			<NavStack.Screen name={HomeNavKey.Login} component={Login} />
			<NavStack.Screen
				name={HomeNavKey.HomeScreen}
				component={HomeScreen}
			/>
			<NavStack.Screen
				name={HomeNavKey.PatientComplaint}
				component={PatientComplaint}
			/>
			<NavStack.Screen
				name={HomeNavKey.ConsultantList}
				component={FacilityList}
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
				name={HomeNavKey.AppointmentTime}
				component={AppointmentTime}
			/>
			<NavStack.Screen
				name={HomeNavKey.ConfirmAppointment}
				component={ConfirmAppointment}
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
			<NavStack.Screen
				name={HomeNavKey.EditAppointment}
				component={EditAppointment}
			/>
			<NavStack.Screen
				name={HomeNavKey.RemoteConsultation}
				component={RemoteConsultation}
			/>

			{/* TODO: to keep doctor routes to a separate stack */}
			<NavStack.Screen
				name={DoctorRoutes.DoctorLogin}
				component={DoctorLogin}
			/>

			<NavStack.Screen
				name={DoctorRoutes.DoctorHome}
				component={DoctorHome}
			/>
			<NavStack.Screen
				name={DoctorRoutes.DoctorAppointmentInfo}
				component={DoctorAppointmentInfo}
			/>
			<NavStack.Screen
				name={DoctorRoutes.DoctorRemoteConsultation}
				component={DoctorRemoteConsultation}
			/>
		</NavStack.Navigator>
	);
}

export default HomeView
