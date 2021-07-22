import React from "react";
import AppointmentSpecifics from "./AppointmentSpecifics";
import VisitHistory from "./VisitHistory";
import { VisitHistoryNavKey, Stack } from "./_navigator";

export default function VisitHistoryView() {
	return (
		<Stack.Navigator headerMode="none">
			<Stack.Screen
				name={VisitHistoryNavKey.VisitHistory}
				component={VisitHistory}
			/>
			<Stack.Screen
				name={VisitHistoryNavKey.AppointmentSpecifics}
				component={AppointmentSpecifics}
			/>
		</Stack.Navigator>
	);
}
