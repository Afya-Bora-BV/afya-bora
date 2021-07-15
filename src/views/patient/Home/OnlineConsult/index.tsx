import React from "react";
import OnlineConsultantSelectDateTime from "./OnlineConsultantSelectDateTime";
import OnlineConsultChooseConsultant from "./OnlineConsultChooseConsultant";

import { OnlineNavKey, Stack } from './_navigator'


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
