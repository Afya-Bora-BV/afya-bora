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
import UserIcon from "../../assets/icons/User";
import BellIcon from "../../assets/icons/Bell";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppointmentIllustration from "../../assets/illustrations/AppointmentIllustration";
import FacilityIllustration from "../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";

import HomeScreenIllustration from "../../assets/illustrations/HomeScreenIllustration";
import auth from "@react-native-firebase/auth";

import { Spacer } from "../../components/Spacer";
import { PrimaryButton } from "../../components/button";
import { atom, useAtom } from "jotai";
import AppointmentCustomizer from "../../components/appointment-customizer";
import { HomeNavKey } from ".";
import { updateAppointmentInProgressAtom } from "./PatientComplaint";
import { getFacilities } from "../../api";
import { TouchableOpacity } from "react-native";
import _ from "lodash";
import { usePatientAppointments } from "../../hooks/usePatientAppointments";
import moment from "moment";
const helpOptions = [
	{
		illustration: FacilityIllustration,
		title: "Map of Facilities near you",
		heading: "Need quick medical attention?",
		onNavigate: (navigation: any) => {
			navigation.navigate(HomeNavKey.FacilityMap);
		},
	},
];

const AccountDetails = () => {
	const navigation = useNavigation();
	const user = auth().currentUser;
	const handlPress = () => {
		if (user) {
			// navigate to seeing details
			navigation.navigate(HomeNavKey.Profile);
		} else {
			navigation.navigate(HomeNavKey.Login);
		}
	};
	console.log("Whats uer : ", user);
	return (
		<Stack space={2}>
			<Heading fontSize="xl">Your AfyaBora Account</Heading>
			<Pressable onPress={handlPress}>
				{/* Find mean to set relative width: 160 -> 33%?? */}
				<Center height={100} bgColor="#FFF" rounded="xl" shadow={4}>
					<AppointmentIllustration size={70} />
					<Text
						fontWeight="800"
						textAlign="center"
					// wordBreak="break-word"
					// overflowWrap="break-word"
					>
						{user
							? "View Profile and Visits"
							: "Sign in / Create Account"}
					</Text>
				</Center>
			</Pressable>
		</Stack>
	);
};

// FIXME: Update user information with information from the profile store.
const ProfileInformation = () => {
	const user = auth().currentUser;
	if (user) {
		return (
			<VStack flex={1}>
				<Text>{Date()}</Text>
				<Heading fontSize="3xl">Hi, {user.phoneNumber}</Heading>
			</VStack>
		);
	}
	return (
		<HStack flexWrap="wrap">
			<VStack flex={1} justifyContent="center">
				<Heading fontSize="3xl">How can we help you today?</Heading>
			</VStack>

			<HomeScreenIllustration flex={3} size={200} />
		</HStack>
	);
};

export default function Home() {
	const navigation = useNavigation();
	// const [isInProgree, setIsAppointmentInProgress] = useAtom(
	// 	updateAppointmentInProgressAtom
	// );

	// React.useEffect(() => {
	// 	setIsAppointmentInProgress(false);
	// }, []);

	const user = auth().currentUser;

	const { appointments } = usePatientAppointments(user?.uid);

	const appointment = appointments[0];

	const openAppointment = (appointment) => {
		navigation.navigate(HomeNavKey.AppointmentSpecifics, { appointment });
	};

	return (
		<MainContainer
			leftSection={() => (
				<Pressable
					onPress={() => {
						navigation.navigate(HomeNavKey.Profile);
					}}
				>
					<IconContainer>
						<UserIcon size={6} color="#561BB3" />
					</IconContainer>
				</Pressable>
			)}
			rightSection={() => (
				<HStack space={4}>
					<Pressable
						onPress={() => {
							navigation.navigate(HomeNavKey.Notification);
						}}
					>
						<IconContainer>
							<BellIcon size={6} color="#561BB3" />
						</IconContainer>
					</Pressable>
				</HStack>
			)}
		>
			<ScrollView width="100%" testID="Home" p={5} pb={10}>
				<ProfileInformation />
				<Spacer size={30} />

				{appointment && (
					<Stack px={1}>
						<View marginBottom={6}>
							<Text fontSize="lg" fontWeight="bold">
								Upcoming Appointments
							</Text>

							{/* FIXME: Extract out to new component */}
							<View
								style={{ marginTop: 16 }}
							>
								<Box
									bgColor="#FFF"
									p={4}
									flexDirection="row"
									rounded={6}
									shadow={3}
								>
									<View flex={1.4}>
										<Icon
											size={40}
											name="calendar-month-outline"
										/>
									</View>
									<VStack flex={5} space={1}>
										<Text fontSize="md" fontWeight="bold">
											{appointment?.facility?.name}
										</Text>
										<Text
											fontWeight="bold"
											color="gray.400"
										>
											{moment(appointment.utcDate).format(
												"DD MMMM YYYY"
											)}
										</Text>
										<Text italic>
											{appointment.timeRange === "online"
												? "Online"
												: "At Facility"}
										</Text>
									</VStack>
									<View flex={2.2} justifyContent="center">
										<TouchableOpacity
											onPress={() => openAppointment(appointment)}
										>

											<Text
												color={colors.primary}
												fontSize="lg"
											>
												Join/Edit
											</Text>
										</TouchableOpacity>

									</View>
								</Box>
							</View>

							<TouchableOpacity
								style={{ marginTop: 8 }}
								onPress={() => {
									console.log("To all the appointment pages")
								}}>
								<Text textAlign="right" my={2} color="gray.500">
									See All Appointments
								</Text>
							</TouchableOpacity>

						</View>

					</Stack>
				)}
				<ScheduleAppointmentSection />
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
							{
								illustration: Illustration,
								onNavigate,
								title,
								heading,
							},
							ix
						) => (
							<Stack key={title} space={2}>
								<Heading fontSize="xl">{heading}</Heading>
								<Pressable
									key={`helpOption-${ix}`}
									onPress={() => onNavigate(navigation)}
								>
									{/* Find mean to set relative width: 160 -> 33%?? */}
									<Center
										// height={100}
										bgColor="#FFF"
										rounded="xl"
										shadow={4}
										padding={6}
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
							</Stack>
						)
					)}
					<AccountDetails />
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}

// TOO: move this component and all its atom to component folder
export const ScheduleAppointmentSection = () => {
	const { navigate } = useNavigation();

	const handleOnPress = () => {
		// just logging the data here which can be accessed in other components as well
		navigate(HomeNavKey.ConsultantList);
		// navigate on click
	};


	return (
		<Box bgColor="#FFF" rounded="xl" shadow={4} p={3}>
			<Stack space={5} py={2}>
				<AppointmentCustomizer />
				<PrimaryButton onPress={handleOnPress}>Schedule</PrimaryButton>
			</Stack>
		</Box>
	);
};
