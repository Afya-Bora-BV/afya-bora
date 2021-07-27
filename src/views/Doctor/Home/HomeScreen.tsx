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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

export function friendlyFormatDate(timeStamp: Date | string | number) {
	const dateObj = new Date(timeStamp);
	const d = new Date();
	const date = dateObj.getDate();
	const month = dateObj.getMonth();
	const year = dateObj.getFullYear();
	const monthName = MONTH_NAMES[d.getMonth()];

	return `${date} ${monthName}`;
}

const NextAppointmentsSection = () => {
	const navigation = useNavigation()
	// const getAppointments = useAppointmentTempoStore(
	// 	(state) => state.getAppointments
	// );
	// const { isLoading, isError, data, error } = useQuery(
	// 	"appointments",
	// 	getAppointments,
	// 	{
	// 		// TODO: to remove this behaviour
	// 		// and instead just fetch either from offline or online state
	// 		refetchInterval: 5000,
	// 	}
	// );
	// if (isLoading) return <Text>Fetching appointement... </Text>;
	// if (error) return <Text>Something went wrong</Text>;
	// if (data?.length === 0) return null;

	// console.log("appointment");
	// console.log(data);
	return (
		// <VStack space={4} marginTop={8}>
		// 	<Heading fontSize="xl">Next Appointment</Heading>
		// 	{data?.map((appointment) => (
		// 		<AppointmentAlert appointment={appointment} />
		// 	))}
		// </VStack>

		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Next Appointment</Heading>
			<Pressable
				onPress={() => {
					navigation.navigate(HomeNavKey.AppointmentInfoScreen)
				}}>
				<AppointmentAlertDoctor />
			</Pressable>
		</VStack>
	);
};

// TO DO - CHANGE TO GET APPOINTMENT FOR TODAY ONLY
const TodayAppointmentsSection = () => {
	// const getAppointments = useAppointmentTempoStore(
	// 	(state) => state.getAppointments
	// );
	// const { isLoading, isError, data, error } = useQuery(
	// 	"appointments",
	// 	getAppointments,
	// 	{
	// 		// TODO: to remove this behaviour
	// 		// and instead just fetch either from offline or online state
	// 		refetchInterval: 5000,
	// 	}
	// );
	// if (isLoading) return <Text>Fetching appointement... </Text>;
	// if (error) return <Text>Something went wrong</Text>;
	// if (data?.length === 0) return null;

	// console.log("appointment");
	// console.log(data);
	return (
		// <VStack space={4} marginTop={8}>
		// 	<Heading fontSize="xl">Today's Appointments</Heading>
		// 	{data?.map((appointment) => (
		// 		<AppointmentAlert appointment={appointment} />
		// 	))}
		// 	<Stack alignItems="flex-end">
		// 		<Text color="#747F9E">See all Today's appointments</Text>
		// 	</Stack>
		// </VStack>

		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Today's Appointments</Heading>
			<VStack space={3}>
				{
					_.times(3).map((_, ix) => (
						<AppointmentAlert key={ix} />
					))
				}

				<View width="100%" alignItems="flex-end">
					<Pressable onPress={() => console.log("Something")}>
						<Text fontStyle="italic">See All Today's Appointments</Text>
					</Pressable>
				</View>
			</VStack>
		</VStack>
	);
};



// const AppointmentAlert: React.FC<{
// 	appointment: DemoAppointmentType;
// }> = ({ appointment }) => {
// 	const {
// 		dateTime: { timeSlots, date },
// 		consultant: { name },
// 	} = appointment;

// 	return (
// 		<VStack>
// 			<HStack
// 				justifyContent="space-between"
// 				alignItems="center"
// 				shadow={2}
// 				rounded={10}
// 				bg="white"
// 				p={4}
// 			>
// 				<VStack>
// 					<HStack
// 						justifyContent="space-between"
// 						alignItems="center"
// 						space={4}
// 					>
// 						<MedicalHistoryIcon />
// 						<VStack>
// 							<Text bold fontSize={20}>
// 								Dr {name}
// 							</Text>
// 							{/* TODO: specify the correct time for appointment */}

// 							<HStack>
// 								<Text bold color="#747F9E">
// 									{friendlyFormatDate(date) + ", "}
// 								</Text>
// 								<Text bold color="#747F9E">
// 									{timeSlots[0]}
// 								</Text>
// 							</HStack>
// 							{/* TO DO - CHANGE TO SHOW STATUS */}
// 							<Text italic>Online</Text>
// 						</VStack>
// 					</HStack>
// 				</VStack>
// 				<HStack>
// 					<Pressable onPress={() => navigation.navigate(HomeNavKey.AppointmentInfoScreen, { appointment })}>
// 						<HStack alignItems="center">
// 							<Text fontSize={15} color={"#561BB3"}>
// 								Join/Edit
// 							</Text>
// 							<Icon size={5}>
// 								<ArrowIcon_Next size={5} />
// 							</Icon>
// 						</HStack>
// 					</Pressable>
// 				</HStack>
// 			</HStack>
// 		</VStack>
// 	);
// };

export default function DoctorHome() {
	const navigation = useNavigation();
	const { profile } = useAuthStore((state) => ({ profile: state.profile }))

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
							navigation.navigate(HomeNavKey.NotificationScreen)
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
				{/* Welcome section */}
				<VStack space={2} paddingTop={2} marginX={5}>
					<Text color="#B0B3C7" fontSize="md">
						{moment().format("D MMMM YYYY")}
					</Text>
					{profile?.type == "doctor" && <Heading fontSize="3xl">Hi, {profile?.name}</Heading>}

				</VStack>

				<VStack space={3} marginX={5}>
					<NextAppointmentsSection />
					<TodayAppointmentsSection />
					<UpcomingAppointmentsSection />
				</VStack>
			</ScrollView>
		</MainContainer>
	);
};


export function AppointmentAlertDoctor({ appointment, onPress }: { appointment: RealTimeAppointment, onPress: () => void }) {
	if (!appointment) return null
	return (
		// <TouchableOpacity onPress={props.onPress}>
		<Box
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			padding={5}
			rounded={20}
			shadow={2}
			bg="white">
			{/* left */}
			<HStack space={3} flexGrow={1} justifyContent="flex-start">
				{/* Icon */}
				<Square size={8}>
					<MedicalHistoryIcon size={6} />
				</Square>
				<VStack>
					<Heading fontSize="lg" color="#000">
						{appointment.pid}
					</Heading>
					<Text fontSize="sm" color="#333">
						{moment(appointment.date.seconds).format("DD MMM, H:MM A")}
					</Text>
					<Text fontSize="sm" fontStyle="italic" color="#333">
						{/* TODO: include facility in appointment */}
						{appointment.type === "online" ? "Online" : appointment.trl_facility?.name}
					</Text>
				</VStack>
			</HStack>
			{/* right */}
			<View alignItems="center" flexDirection="row">
				{appointment.type === "offline" ?
					<Text fontSize={15} color={'#561BB3'} onPress={() => {
						console.log("Offline facility edit")
						onPress()
					}}>
						Edit
					</Text>
					:
					<Text fontSize={15} color={'#561BB3'} onPress={() => {
						console.log("Online facility edit")
						onPress()
					}}>
						Join/Edit
					</Text>
				}


				<Icon size={5}>
					<ArrowIcon_Next size={5} />
				</Icon>
			</View>
		</Box>
		// </TouchableOpacity>
	);
}

const UpcomingAppointmentsSection = () => {
	const navigation = useNavigation();
	const uid = auth().currentUser?.uid
	const [appointments, setAppointments] = useState<RealTimeAppointment[]>([])
	useEffect(() => {
		const subscriber = firestore()
			.collection('appointments')
			.where("cid", "==", uid)
			.onSnapshot(documentSnapshot => {
				const shots = [...documentSnapshot.docs.map(doc => ({ ...doc.data() }))]
				setAppointments(shots as RealTimeAppointment[])
			});

		// Stop listening for updates when no longer required
		return () => subscriber();
	}, [uid]);

	console.log("Appontments : ")
	console.log(JSON.stringify(appointments, null, 3))
	return (
		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Upcoming Appointments</Heading>
			<VStack space={3}>
				<AppointmentAlertDoctor appointment={appointments[0]} onPress={() => {
					navigation.navigate(HomeNavKey.AppointmentInfoScreen, {
						appointment: appointments[0]
					})
					console.log("Clickinig appointment event")
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
