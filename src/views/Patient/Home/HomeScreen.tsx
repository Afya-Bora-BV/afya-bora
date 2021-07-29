import React, { useEffect, useState } from "react";
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
} from "native-base";
import UserIcon from "../../../assets/icons/User";
import BellIcon from "../../../assets/icons/Bell";
import SearchIcon from "../../../assets/icons/Search";
import MedicalHistoryIcon from "../../../assets/icons/MedicalHistory";

import AppointmentIllustration from "../../../assets/illustrations/AppointmentIllustration";
import OnlineConsulationIllustration from "../../../assets/illustrations/OnlineConsulationIllustration";
import FacilityIllustration from "../../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { HomeNavKey } from "./_navigator";
import { colors } from "../../../constants/colors";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";

import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../../internals/appointment/context";
import { useQuery } from "react-query";
import { AppointmentAlert } from "../../../components/core/appointment";
import { useAuthStore } from "../../../internals/auth/context";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { RealTimeAppointment } from "../../../types";

const helpOptions = [
	{
		illustration: AppointmentIllustration,
		title: "Book an Appointment",
		onNavigate: (navigation: any) => {
			navigation.navigate(HomeNavKey.BookAppointmentViewScreen)
		},
	},
	{
		illustration: OnlineConsulationIllustration,
		title: "Online Consultation",
		onNavigate: (navigation: any) => {
			navigation.navigate(HomeNavKey.OnlineConsultViewScreen)
		},
	},
	{
		illustration: FacilityIllustration,
		title: "Find a Facility",
		onNavigate: (navigation: any) => {
			navigation.navigate(HomeNavKey.MapFaciltyViewScreen)
		}
	},
];

export default function Home() {
	const navigation = useNavigation();
	const { profile } = useAuthStore(state => ({ profile: state.profile }))

	console.log("User profile")
	console.log(JSON.stringify(profile, null, 2))
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
					<IconContainer>
						<SearchIcon size={6} color="#561BB3" />
					</IconContainer>
				</HStack>
			)}
		>
			<ScrollView width="100%" testID="Home">
				{/* Welcome section */}
				<VStack space={2} paddingTop={2} marginX={5}>
					<Text color="#B0B3C7" fontSize="md">
						{moment().format("D MMMM YYYY")}
					</Text>
					<Heading fontSize="3xl">Hi, {profile?.name}</Heading>
				</VStack>

				{/* Section to render upcoming appointments if any.
					NOTE: To prevent re-rendering, dont use inline if statements
					*/}
				<Box marginX={5}>
					<UpcomingAppointmentsSection />
				</Box>

				<VStack padding={5}>
					<Heading fontSize="xl">How can we help?</Heading>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						alwaysBounceHorizontal
						height={215}
					>
						<HStack
							space={4}
							marginTop={3}
							justifyContent="space-between"
							paddingX={1}
						>
							{helpOptions.map(
								(
									{
										illustration: Illustration,
										onNavigate,
										title,
									},
									ix
								) => (
									<Pressable
										key={`helpOption-${ix}`}
										onPress={() => onNavigate(navigation)}
									>
										{/* Find mean to set relative width: 160 -> 33%?? */}
										<Center
											width={140}
											height={200}
											paddingY={3}
											bgColor="#FFF"
											rounded="xl"
											shadow={4}
										>
											<Illustration size={100} />
											<Text
												fontWeight="800"
												marginTop={5}
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
						</HStack>
					</ScrollView>
				</VStack>

				<VStack>
					<View padding={5}>
						<Heading fontSize="xl">Top Rated Specialists</Heading>
					</View>

					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						alwaysBounceHorizontal
					>
						<HStack justifyContent="space-between" marginX={3}>
							{[
								{
									name: "Dr. Maryam Mohamedali",
									location: "Arusha, Tanzania",
									specialization:
										"Immunology, Gynecology, Internal Medicine",
									color: "#EEE",
									textColor: colors.primary,
								},
								{
									name: "Dr. Wyckliffe Sango",
									color: "#258FBE",
								},
								{
									name: "Dr. Ally Salim",
									color: "#258FBE",
								},
							].map(
								(
									{
										color,
										name,
										location,
										specialization,
										textColor,
									},
									ix
								) => (
									<Box
										key={`trspec-${ix}`}
										paddingX={6}
										paddingY={8}
										bgColor={color}
										rounded="xl"
										marginX={2}
										width={200}
										minHeight={250}
									>
										<VStack>
											<Heading
												fontSize="md"
												color={textColor || "#FFFFFF"}
											>
												{name}
											</Heading>
											<VStack space={1} marginTop={3}>
												<View>
													<Text fontSize="sm">
														{location}
													</Text>
												</View>
												<View>
													<Text fontSize="sm">
														{specialization}
													</Text>
												</View>
											</VStack>
										</VStack>
									</Box>
								)
							)}
						</HStack>
					</ScrollView>
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}


// TODo : to extended as appointment data grows


// TODO: find a better place to fetch all the data


export const UpcomingAppointmentsSection = () => {
	const navigation = useNavigation();
	const { profile } = useAuthStore((state) => ({ profile: state.profile }))

	const [appointments, setAppointments] = useState<RealTimeAppointment[]>([])
	useEffect(() => {
		const subscriber = firestore()
			.collection('appointments')
			.where("pid", "==", profile?.id)
			.onSnapshot(documentSnapshot => {
				const shots = [...documentSnapshot.docs.map(doc => ({ ...doc.data() }))]
				setAppointments(shots as RealTimeAppointment[])
			});

		// Stop listening for updates when no longer required
		return () => subscriber();
	}, [profile?.id]);

	console.log("Appontments : ")
	console.log(JSON.stringify(appointments, null, 3))
	return (
		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Upcoming Appointments</Heading>
			<VStack space={3}>
				<AppointmentAlert appointment={appointments[0]} onPress={() => {
					navigation.navigate(HomeNavKey.AppointmentInfoScreen, {
						appointment: appointments[0]
					})
				}} />


				<View width="100%" alignItems="flex-end">
					<Pressable onPress={() => console.log("Something")}>
						<Text fontStyle="italic">See All Appointments</Text>
					</Pressable>
				</View>
			</VStack>
		</VStack>
	);
};
