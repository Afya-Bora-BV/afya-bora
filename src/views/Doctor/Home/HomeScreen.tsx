import { useNavigation } from "@react-navigation/core";
import {
	ArrowForwardIcon,
	Box,
	Heading,
	HStack,
	Icon,
	Pressable,
	ScrollView,
	Square,
	Stack,
	Text,
	View,
	VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import UserIcon from "../../../assets/icons/User";
import BellIcon from "../../../assets/icons/Bell";

import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../../internals/appointment/context";
import { useQuery } from "react-query";
import MedicalHistoryIcon from "../../../assets/icons/MedicalHistory";
import moment from "moment";
import { HomeNavKey } from "./_navigator";
import _ from "lodash";
import { AppointmentAlert } from "../../../components/core/appointment";
import { TouchableOpacityBase } from "react-native";
import { useAuthStore } from "../../../internals/auth/context";
import { RealTimeAppointment } from "../../../types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ArrowIcon_Next from "../../../assets/icons/ArrowIcon_Next";

export const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function DoctorHome() {
	const navigation = useNavigation();
	const { profile } = useAuthStore((state) => ({ profile: state.profile }));

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
						onPress={() => {
							navigation.navigate(HomeNavKey.NotificationScreen);
						}}
					>
						<IconContainer>
							<BellIcon size={6} color="#561BB3" />
						</IconContainer>
					</Pressable>
				</HStack>
			)}
		>
			<ScrollView width="100%">
				<VStack space={2} paddingTop={2} marginX={5}>
					<Text color="#B0B3C7" fontSize="md">
						{moment().format("D MMMM YYYY")}
					</Text>
					{profile?.type == "doctor" && (
						<Heading fontSize="3xl">Hi, {profile?.name}</Heading>
					)}
				</VStack>

				<VStack space={3} marginX={5}>
					<Appointments />
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}

export function AppointmentAlertDoctor({
	appointment,
	onPress,
}: {
	appointment: RealTimeAppointment;
	onPress: () => void;
}) {
	if (!appointment) return null;
	return (
		<Box
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			padding={5}
			rounded={20}
			shadow={2}
			bg="white"
		>
			{/* left */}
			<HStack space={3} flexGrow={1} justifyContent="flex-start">
				{/* Icon */}
				<Square size={8}>
					<MedicalHistoryIcon size={6} />
				</Square>
				<VStack>
					<Heading fontSize="lg" color="#000">
						{appointment.patient.name}
					</Heading>
					<Text fontSize="sm" color="#333">
						{moment.unix(appointment.date.seconds).format(
							"DD MMM, H:MM A"
						)}
					</Text>
					<Text fontSize="sm" fontStyle="italic" color="#333">
						{/* TODO: include facility in appointment */}
						{appointment.type === "online"
							? "Online"
							: appointment.facility?.name}
					</Text>
				</VStack>
			</HStack>
			{/* right */}
			<View alignItems="center" flexDirection="row">
				{appointment.type === "offline" ? (
					<Text
						fontSize={15}
						color={"#561BB3"}
						onPress={() => {
							console.log("Offline facility edit");
							onPress();
						}}
					>
						Edit
					</Text>
				) : (
					<Text
						fontSize={15}
						color={"#561BB3"}
						onPress={() => {
							console.log("Online facility edit");
							onPress();
						}}
					>
						Join/Edit
					</Text>
				)}

				<Icon size={5}>
					<ArrowIcon_Next size={5} />
				</Icon>
			</View>
		</Box>
	);
}

export const Appointments = () => {
	const [appointments, setAppointments] = useState<RealTimeAppointment[]>([]);
	const navigation = useNavigation();
	const { profile } = useAuthStore((state) => ({ profile: state.profile }));

	const uid = auth().currentUser?.uid;
	useEffect(() => {
		const subscriber = firestore()
			.collection("appointments")
			.where("cid", "==", profile?.id)
			.onSnapshot((documentSnapshot) => {
				const shots = [
					...documentSnapshot.docs.map((doc) => ({ ...doc.data() })),
				];
				setAppointments(shots as RealTimeAppointment[]);
			});

		return () => subscriber();
	}, [profile?.id]);

	const nextAppointments = appointments?.filter(appointment => (
		moment.unix(appointment.date.seconds).format(
			"DD MMM YYYY"
		) === moment(new Date()).format("DD MMM YYYY") &&
		moment.unix(appointment.date.seconds).format("hh:mm") >
		moment(new Date()).format("hh:mm"))
		&& !moment.unix(appointment.date.seconds).isSame(moment(), "day")
	)

	const todaysAppointments = appointments?.filter(appointment => {
		return moment.unix(appointment.date.seconds).isSame(moment(), "day")
	})

	const upcomingAppointments = appointments?.filter(appointment => (
		moment.unix(appointment.date.seconds).format("DD MMM YYYY") >
		moment(new Date()).format("DD MMM YYYY")
	))

	console.log("Apponintments")
	console.log(JSON.stringify(appointments, null, 3))

	return (
		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Next Appointment</Heading>
			<VStack space={3}>
				{nextAppointments.map((appointment) => {
					return (
						<View>
							<AppointmentAlertDoctor
								appointment={appointment}
								onPress={() => {
									navigation.navigate(
										HomeNavKey.AppointmentInfoScreen,
										{
											appointment: appointment,
										}
									);
									console.log(
										"Clicking appointment event"
									);
								}}
							/>
						</View>
					);
				})}
			</VStack>

			<Heading fontSize="xl">Today's Appointments</Heading>
			<VStack space={3}>
				{todaysAppointments.map((appointment) => {
					return (
						<View>
							<AppointmentAlertDoctor
								appointment={appointment}
								onPress={() => {
									navigation.navigate(
										HomeNavKey.AppointmentInfoScreen,
										{
											appointment: appointment,
										}
									);
									console.log(
										"Clicking appointment event"
									);
								}}
							/>
						</View>
					);
				})}
				<HStack alignItems="flex-end">
					<Pressable
						onPress={() => console.log("Something")}
					>
						<Text fontStyle="italic">
							See All Today's Appointments
						</Text>
					</Pressable>
				</HStack>
			</VStack>

			<Heading fontSize="xl">Upcoming Appointments</Heading>
			<VStack space={3}>
				{upcomingAppointments.map((appointment) => {
					return (
						<View>
							<AppointmentAlertDoctor
								appointment={appointment}
								onPress={() => {
									navigation.navigate(
										HomeNavKey.AppointmentInfoScreen,
										{
											appointment: appointment,
										}
									);
									console.log(
										"Clicking appointment event"
									);
								}}
							/>

						</View>
					);
				})}
				<HStack alignItems="flex-end">
					<Pressable
						onPress={() => console.log("Something")}
					>
						<Text fontStyle="italic">
							See All Upcoming Appointments
						</Text>
					</Pressable>
				</HStack>
			</VStack>
		</VStack>
	);
};
