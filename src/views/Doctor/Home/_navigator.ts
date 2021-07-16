import { createStackNavigator } from "@react-navigation/stack"

export const NavStack = createStackNavigator();

// NOTE: You might need to make the names for the navigation keys unique. 
//  To prevent funny cases from presenting themselves
export const HomeNavKey = {
	HomeScreen: "DoctorHomeScreen",
	NotificationScreen: "DoctorNotificationScreen",
	AppointmentInfoScreen: "DoctorAppointmentInfoScreen",
};
