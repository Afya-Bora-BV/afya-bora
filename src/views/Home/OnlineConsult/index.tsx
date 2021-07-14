import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import OnlineConsultantSelectDateTime from "./OnlineConsultantSelectDateTime";
import OnlineConsultChooseConsultant from "./OnlineConsultChooseConsultant";

const Stack = createStackNavigator();

export type OnlineConsultStackParamList = {
	OnlineConsultChooseConsultant: {
		appointment: any;
	};
};

export const OnlineNavKey = {
	SelectDateTimeScreen: "OnlineConsultantSelectDateTime",
	ChooseConsultantScreen: "OnlineConsultChooseConsultant",
};

export default function OnlineConsultView() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen
				name={OnlineNavKey.SelectDateTimeScreen}
				component={OnlineConsultantSelectDateTime}
			/>
			<Stack.Screen
				name={OnlineNavKey.ChooseConsultantScreen}
				component={OnlineConsultChooseConsultant}
			/>
		</Stack.Navigator>
	);
}
