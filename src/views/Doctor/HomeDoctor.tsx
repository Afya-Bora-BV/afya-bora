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
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import UserIcon from "../../assets/icons/User";
import BellIcon from "../../assets/icons/Bell";

import { useQuery } from "react-query";
import MedicalHistoryIcon from "../../assets/icons/MedicalHistory";
import moment from "moment";
import _ from "lodash";
import { AppointmentAlert } from "../../components/core/appointment";
import { ToastAndroid, TouchableOpacityBase } from "react-native";
import { RealTimeAppointment } from "../../types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ArrowIcon_Next from "../../assets/icons/ArrowIcon_Next";
import { useAuth } from "../../contexts/AuthContext";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { DoctorRoutes } from '../Patient';

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
	const { profile, user } = useAuth();

	const userExistsDoctor = user && (profile?.type === "consultant")
	const signOut = () => auth().signOut();

	return (
		<MainContainer
			leftSection={() => (
				<HStack space={4}>
					{userExistsDoctor ?
						null
						:
						<IconContainer>
							<UserIcon size={6} color="#561BB3" />
						</IconContainer>
					}

				</HStack>
			)}
			rightSection={() => (
				<HStack space={4}>
					<Pressable
						onPress={() => {
							// navigation.navigate(HomeNavKey.NotificationScreen);
							ToastAndroid.show(
								"signing out ",
								ToastAndroid.SHORT
							);
							signOut()
								.then((res) => {
									console.log("Successfuly signed out");
								})
								.catch((e) => {
									console.log(
										"Something went wrong in signing out"
									);
								});
						}}
					>
						<IconContainer>
							<MaterialIcon
								name="logout"
								size={25}
								color="#561BB3"
							/>
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
					{profile?.type == "consultant" && (
						<Heading fontSize="3xl">Hi, {profile?.name}</Heading>
					)}
				</VStack>

				<VStack space={3} marginX={5}>

					{profile && <Appointments />}

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
						{appointment?.patient?.name}
					</Heading>
					<Text fontSize="sm" color="#333">
						{moment
							(appointment.date.toDate())
							.format("DD MMM, H:MM A")}
					</Text>
					<Text fontSize="sm" fontStyle="italic" color="#333">
						{/* TODO: include facility in appointment */}
						{appointment.type === "online"
							? "Online"
							: "Offline"
							// : appointment?.facility?.name}
						}

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

const useConsultantsAppointments = ({ consultantId }: { consultantId: string | undefined }) => {

	const [allAppointments, setAllAppointments] = useState<RealTimeAppointment[]>([]);
	const [loading, setLoading] = useState(true);

	const today = new Date()

	useEffect(() => {

		if (consultantId) {
			const subscription = firestore()
				.collection("appointments")
				.where("cid", "==", consultantId)
				// .where("date", ">=", today)
				.orderBy("date", "asc")
				.onSnapshot(
					async (snap) => {

						var results: RealTimeAppointment[] = await Promise.all(snap.docs.map(async (data): Promise<RealTimeAppointment> => {
							const pid = data.data().pid
							if (pid) {
								const docSnap = await firestore().collection('patients').doc(pid).get()
								if (docSnap.exists) {
									const patient = docSnap.data();
									const final = {
										id: data.id,
										...data.data(),
										patient
									} as RealTimeAppointment
									return final
								} else {
									// TODO : to be removed since every RealTimeAppointment must have fid
									const final = {
										id: data.id,
										...data.data(),
									} as RealTimeAppointment
									return final
								}
							} else {
								const final = {
									id: data.id,
									...data.data(),
								} as RealTimeAppointment
								return final
							}
						}));
						setAllAppointments([
							...results,
						])


						setLoading(false);
					},
					(error) => {
						console.log("Error: ");
						console.log(error);
						setLoading(false);
					}
				);
			return () => subscription();
		} else {
			// console.log("WHATS GOING ON")
		}
	}, [consultantId]);


	return {
		appointments: allAppointments,
	};

}

export const Appointments = () => {
	const navigation = useNavigation();
	const { profile } = useAuth();

	const uid = auth().currentUser?.uid;
	const { appointments } = useConsultantsAppointments({ consultantId: profile?.id })

	const nextAppointments = appointments?.filter(
		(appointment) =>
			moment(appointment.date.toDate()).format("DD MMM YYYY") ===
			moment(new Date()).format("DD MMM YYYY") &&
			moment(appointment.date.toDate()).format("hh:mm") >
			moment(new Date()).format("hh:mm") &&
			moment(appointment.date.toDate()).isSame(moment(), "day") &&
			appointment.status !== "cancelled"
	);

	const todaysAppointments = appointments?.filter((appointment) => {
		return (
			moment(appointment.date.toDate()).isSame(moment(), "day") &&
			appointment.status !== "cancelled"
		);
	});

	const upcomingAppointments = appointments?.filter((appointment) => {
		return (
			moment(appointment.date.toDate()).isAfter() &&
			appointment.status !== "cancelled"
		);
	});

	console.log("Apponintments");
	console.log(JSON.stringify(appointments, null, 3));

	return (
		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Next Appointment</Heading>
			<VStack space={3}>
				{nextAppointments.map((appointment) => {
					return (
						<View key={appointment?.id}>
							<AppointmentAlertDoctor
								appointment={appointment}
								onPress={() => {
									console.log(
										"Going to doctor appointment info"
									);
									navigation.navigate(
										DoctorRoutes.DoctorAppointmentInfo,
										{
											appointment: appointment,
										}
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
						<View key={appointment?.id}>
							<AppointmentAlertDoctor
								appointment={appointment}
								onPress={() => {
									console.log(
										"Going to doctor appointment info"
									);
									navigation.navigate(
										DoctorRoutes.DoctorAppointmentInfo,
										{
											appointment: appointment,
										}
									);
								}}
							/>
						</View>
					);
				})}
				<HStack alignItems="flex-end">
					<Pressable onPress={() => console.log("Something")}>
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
						<View key={appointment?.id}>
							<AppointmentAlertDoctor
								appointment={appointment}
								onPress={() => {
									console.log(
										"Going to doctor appointment info"
									);
									navigation.navigate(
										DoctorRoutes.DoctorAppointmentInfo,
										{
											appointment: appointment,
										}
									);
								}}
							/>
						</View>
					);
				})}
				<HStack alignItems="flex-end">
					<Pressable onPress={() => console.log("Something")}>
						<Text fontStyle="italic">
							See All Upcoming Appointments
						</Text>
					</Pressable>
				</HStack>
			</VStack>
		</VStack>
	);
};
