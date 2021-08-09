import { createStackNavigator } from "@react-navigation/stack";

export const NavStack = createStackNavigator();

export const HomeNavKey = {
	HomeScreen: "HomeScreen",
	NotificationScreen: "NotificationScreen",
	ConsultantList: "ConsultantList",
	OnlineConsultViewScreen: "OnlineConsultView",
	MapFaciltyViewScreen: "MapFaciltyView",
	AppointmentInfoScreen: "AppointmentInfo",
	EditAppointment: "EditAppointment",
	PatientVideoCallScreen: "PatientVideoCallScreen"
};
