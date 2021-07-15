import React, { useCallback } from "react";
import { ArrowBackIcon, Box, Pressable, ScrollView, VStack } from "native-base";
import { HeaderwithBack } from "../../../../components/header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../../../../components/consultant-list-item";
import _ from "lodash";

import { NavKey } from "../BookAppointment/_navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import MainContainer from "../../../../components/containers/MainContainer";
import { IconContainer } from "../../../../components/misc";

// NOTE: Dont move this to main.... results to require cycle
export type OnlineConsultStackParamList = {
	OnlineConsultChooseConsultant: {
		appointment: any;
	};
};

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
	// const { goBack, navigate } = useNavigation();
	const navigation = useNavigation();

	//ACCESS TIME HERE
	const appointment = route.params.appointment;

	const onPressNext = useCallback(
		(consultant: any) => {
			navigation.navigate(NavKey.PatientComplaintScreen, {
				consultant,
				appointment,
			});
		},
		[navigation]
	);

	return (
		<MainContainer
			title="Choose a consultant"
			leftSection={
				// Go back if can go back
				navigation.canGoBack()
					? () => (
							<Pressable onPress={() => navigation.goBack()}>
								<IconContainer>
									<ArrowBackIcon size={6} color="#561BB3" />
								</IconContainer>
							</Pressable>
					  )
					: undefined
			}
		>
			<ScrollView padding={5}>
				<VStack space={2}>
					{demoConsultants.map((consultant) => (
						<ConsultantListItem
							onPress={() => onPressNext(consultant)}
							key={consultant.id}
							consultant={consultant}
						/>
					))}
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}
