import React, { useCallback } from "react";
import { ArrowBackIcon, Box, Pressable, ScrollView, VStack } from "native-base";
import { HeaderwithBack } from "../../../../components/header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../../../../components/consultant-list-item";
import _ from "lodash";

import { StackNavigationProp } from "@react-navigation/stack";
import MainContainer from "../../../../components/containers/MainContainer";
import { IconContainer } from "../../../../components/misc";

import { NavKey as BookAppointmentNavKey } from "../BookAppointment/_navigator";
import { HomeNavKey as MainNavKey } from "../_navigator";
import ConsultantsList, { getConsultants } from "../BookAppointment/ConsultantsList";
import { useQuery } from "react-query";

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

export type DemoConsultant = {
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
	
			navigation.navigate(MainNavKey.BookAppointmentViewScreen, {
				screen: BookAppointmentNavKey.PatientComplaintScreen,
				params: {
					consultant,
					appointment,
					appointmentType: "online",
				},
			});
		},
		[navigation, appointment]
	);

	// TODO: to asbstract to custom hook and fetch all online and offline consultants
	// and filter from there, and use the hook in ConsultantsList and Here

	const {
		status,
		data: consultants,
		error,
		isLoading,
	} = useQuery(["consultants"], getConsultants);

	console.log("Status ", isLoading);
	console.log("Error ", error);
	console.log("Data ", consultants);

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
					{consultants?.map((consultant) => (
						<ConsultantListItem
							onPress={() => onPressNext(consultant)}
							key={consultant.cid}
							consultant={consultant}
						/>
					))}
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}
