import { createStackNavigator } from '@react-navigation/stack'

export const Stack = createStackNavigator();
export type ProfileStackParamList = {};


export const ProfileNavKey = {
	MainScreen: "Doctor.Profile.MainScreen",
	ProfileScreen: "Doctor.Profile.ProfileScreen",
	CreateProfile: "Doctor.Profile.CreateProfileScreen",
};
