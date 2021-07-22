import { createStackNavigator } from '@react-navigation/stack'

export const Stack = createStackNavigator();
export type ProfileStackParamList = {};

export const ProfileNavKey = {
	MainScreen: "Patient.Profile.MainScreen",
	ProfileScreen: "Patient.Profile.ProfileScreen",
	EditHealthProfile: "Patient.Profile.EditHealthProfile",
	VisitHistory: "Patient.Profile.VisitHistory",
	UpcomingAppointments: "Patient.Profile.UpcomingAppointments"
};
