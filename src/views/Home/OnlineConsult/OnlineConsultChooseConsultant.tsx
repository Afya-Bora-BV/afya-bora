import React from "react";
import { Box, VStack } from "native-base";
import { HeaderwithBack } from "../../../components/header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../../../components/consultant-list-item";
import _ from "lodash";

import { NavKey as BookAppointmentNavKey } from "../BookAppointment";
import { HomeNavKey as MainNavKey } from "../";
import { OnlineConsultStackParamList } from ".";
import { StackNavigationProp } from "@react-navigation/stack";

type OnlineConsultChooseConsultantScreenRouteProp = RouteProp<
	OnlineConsultStackParamList,
	"OnlineConsultChooseConsultant"
>;
type OnlineConsultChooseConsultantNavigationProp = StackNavigationProp<
	OnlineConsultStackParamList,
	"OnlineConsultChooseConsultant"
>;

type OnlineConsultChooseConsultantProps = {
	route: OnlineConsultChooseConsultantScreenRouteProp;
	navigation: OnlineConsultChooseConsultantNavigationProp;
};

type DemoConsultant = {
	id: string;
	name: string;
	hospital: string;
	region: string;
	expertise: string;
	rating: number;
	ratedBy: number;
	time: string;
	status: "online" | "offline";
};

const demoConsultants: DemoConsultant[] = [
	{
		id: "uindlxAa",
		name: "Ally Salim",
		hospital: "Aga Khan Hospital",
		region: "Arusha, Tanzania",
		expertise: "General Practitioner",
		rating: 4,
		ratedBy: 289,
		time: "1:00",
		status: "online",
	},
	{
		id: "uindlxAa",
		name: "Ally Salim",
		hospital: "Aga Khan Hospital",
		region: "Arusha, Tanzania",
		expertise: "General Practitioner",
		rating: 4,
		ratedBy: 289,
		time: "1:00",
		status: "offline",
	},
];

export default function OnlineConsultChooseConsultant({
	route,
}: OnlineConsultChooseConsultantProps) {
	const { goBack, navigate } = useNavigation();

	//ACCESS TIME HERE
	const appointment = route.params.appointment;

	return (
		<VStack flex={1} py={8} px={4} position="relative">
			<VStack space={4}>
				<HeaderwithBack
					text="Choose a Consultant"
					onBackPress={() => goBack()}
				/>
				{demoConsultants.map((consultant) => (
					<ConsultantListItem
						onPress={() =>
							navigate(MainNavKey.BookAppointmentViewScreen, {
								screen: BookAppointmentNavKey.PatientComplaintScreen,
								params: { consultant },
							})
						}
						key={consultant.id}
						consultant={consultant}
					/>
				))}
			</VStack>
		</VStack>
	);
}