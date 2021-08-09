import React, { useCallback, useEffect, useState } from "react";
import {
	Box,
	Center,
	HStack,
	VStack,
	Text,
	View,
	Heading,
	Pressable,
	ScrollView,
	Square,
	useToast,
	Select,
	Stack,
	CheckIcon,
} from "native-base";
import UserIcon from "../../../assets/icons/User";
import BellIcon from "../../../assets/icons/Bell";
import AppointmentIllustration from "../../../assets/illustrations/AppointmentIllustration";
import FacilityIllustration from "../../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import { HomeNavKey } from "./_navigator";
import { NavKey } from "../../_Main/_navigator";
import { colors } from "../../../constants/colors";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";

import HomeScreenIllustration from "../../../assets/illustrations/HomeScreenIllustration";


import { Spacer } from "../../../components/Spacer";
import { PrimaryButton } from "../../../components/button";
import { atom, useAtom } from "jotai";
import AppointmentCustomizer, { completeScheduleAtom } from "../../../components/appointment-customizer";

const helpOptions = [
	{
		illustration: FacilityIllustration,
		title: "Map of Facilities near you",
		onNavigate: (navigation: any) => {
			navigation.navigate(HomeNavKey.MapFaciltyViewScreen);
		},
	},
	{
		illustration: AppointmentIllustration,
		title: "Sign in / Create Account",
		onNavigate: (navigation: any) => {
			navigation.navigate(NavKey.LoginScreen);
		},
	},
];

export default function Home() {
	const navigation = useNavigation();
	// const { profile } = useAuthStore((state) => ({ profile: state.profile }));

	console.log("User profile");
	// console.log(JSON.stringify(profile, null, 2));
	return (
		<MainContainer
			leftSection={() => (
				<IconContainer>
					<UserIcon size={6} color="#561BB3" />
				</IconContainer>
			)}
			rightSection={() => (
				<HStack space={4}>
					<Pressable
						onPress={() =>
							navigation.navigate(HomeNavKey.NotificationScreen)
						}
					>
						<IconContainer>
							<BellIcon size={6} color="#561BB3" />
						</IconContainer>
					</Pressable>
				</HStack>
			)}
		>
			<ScrollView width="100%" testID="Home" p={5} pb={10}>
				<HStack flexWrap="wrap">
					<VStack flex={1} justifyContent="center">
						<Heading fontSize="3xl">
							How can we help you today?
						</Heading>
					</VStack>

					<HomeScreenIllustration flex={3} size={200} />
				</HStack>

				<Spacer size={30} />

				<Stack px={1}>
					<ScheduleAppointmentSection />
				</Stack>

				<Spacer size={30} />

				<VStack
					space={4}
					marginTop={3}
					justifyContent="space-between"
					px={1}
					py={2}
				>
					{helpOptions.map(
						(
							{ illustration: Illustration, onNavigate, title },
							ix
						) => (
							<Pressable
								key={`helpOption-${ix}`}
								onPress={() => onNavigate(navigation)}
							>
								{/* Find mean to set relative width: 160 -> 33%?? */}
								<Center
									height={100}
									bgColor="#FFF"
									rounded="xl"
									shadow={4}
								>
									<Illustration size={70} />
									<Text
										fontWeight="800"
										textAlign="center"
									// wordBreak="break-word"
									// overflowWrap="break-word"
									>
										{title}
									</Text>
								</Center>
							</Pressable>
						)
					)}
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}

interface CompleteProfileInputs {
	location: string;
	speciality: string;
}

const ScheduleButton = () => {
	const [schedule] = useAtom(completeScheduleAtom);
	const { navigate } = useNavigation();
	const handleOnPress = () => {
		// just logging the data here which can be accessed in other components as well
		console.log("Currently schedule value", schedule);
		navigate(HomeNavKey.ConsultantList);
		// navigate on click
	};

	// TODO: fixing type issue here
	return <PrimaryButton onPress={handleOnPress}>Schedule</PrimaryButton>;
};


// TOO: move this component and all its atom to component folder
export const ScheduleAppointmentSection = () => {
	return (
		<Box bgColor="#FFF" rounded="xl" shadow={4} p={3}>
			<Stack space={5} py={2}>
				<AppointmentCustomizer/>
				<ScheduleButton />
			</Stack>
		</Box>
	);
};
