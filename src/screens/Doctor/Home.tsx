import { useNavigation } from "@react-navigation/core";
import {
	ArrowForwardIcon,
	Box,
	Heading,
	HStack,
	Icon,
	Pressable,
	ScrollView,
	Stack,
	Text,
	VStack,
} from "native-base";
import React from "react";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import { HomeNavKey } from "../../views/Home";
import UserIcon from "../../assets/icons/User";
import BellIcon from "../../assets/icons/Bell";
import SearchIcon from "../../assets/icons/Search";
import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../internals/appointment/context";
import { useQuery } from "react-query";
import MedicalHistoryIcon from "../../assets/icons/MedicalHistory";
import moment from "moment";
import ArrowIcon_Next from "../../assets/icons/ArrowIcon_Next";
import { NavKey } from ".";

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
	const getAppointments = useAppointmentTempoStore(
		(state) => state.getAppointments
	);
	const { isLoading, isError, data, error } = useQuery(
		"appointments",
		getAppointments,
		{
			// TODO: to remove this behaviour
			// and instead just fetch either from offline or online state
			refetchInterval: 5000,
		}
	);
	if (isLoading) return <Text>Fetching appointement... </Text>;
	if (error) return <Text>Something went wrong</Text>;
	if (data?.length === 0) return null;

	// console.log("appointment");
	// console.log(data);
	return (
		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Next Appointment</Heading>
			{data?.map((appointment) => (
				<AppointmentAlert appointment={appointment} />
			))}
		</VStack>
	);
};

// TO DO - CHANGE TO GET APPOINTMENT FOR TODAY ONLY
const TodayAppointmentsSection = () => {
	const getAppointments = useAppointmentTempoStore(
		(state) => state.getAppointments
	);
	const { isLoading, isError, data, error } = useQuery(
		"appointments",
		getAppointments,
		{
			// TODO: to remove this behaviour
			// and instead just fetch either from offline or online state
			refetchInterval: 5000,
		}
	);
	// if (isLoading) return <Text>Fetching appointement... </Text>;
	if (error) return <Text>Something went wrong</Text>;
	if (data?.length === 0) return null;

	// console.log("appointment");
	// console.log(data);
	return (
		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Today's Appointments</Heading>
			{data?.map((appointment) => (
				<AppointmentAlert appointment={appointment} />
			))}
			<Stack alignItems="flex-end">
				<Text color="#747F9E">See all Today's appointments</Text>
			</Stack>
		</VStack>
	);
};

const UpcomingAppointmentsSection = () => {
	const getAppointments = useAppointmentTempoStore(
		(state) => state.getAppointments
	);
	const { isLoading, isError, data, error } = useQuery(
		"appointments",
		getAppointments,
		{
			// TODO: to remove this behaviour
			// and instead just fetch either from offline or online state
			refetchInterval: 5000,
		}
	);
	// if (isLoading) return <Text>Fetching appointement... </Text>;
	if (error) return <Text>Something went wrong</Text>;
	if (data?.length === 0) return null;

	// console.log("appointment");
	// console.log(data);
	return (
		<VStack space={4} marginTop={8}>
			<Heading fontSize="xl">Upcoming Appointments</Heading>
			{data?.map((appointment) => (
				<AppointmentAlert appointment={appointment} />
			))}
		</VStack>
	);
};

const AppointmentAlert: React.FC<{
	appointment: DemoAppointmentType;
}> = ({ appointment }) => {
	const {
		dateTime: { timeSlots, date },
		consultant: { name },
	} = appointment;

	return (
		<VStack>
			<HStack
				justifyContent="space-between"
				alignItems="center"
				shadow={2}
				rounded={10}
				bg="white"
				p={4}
			>
				<VStack>
					<HStack
						justifyContent="space-between"
						alignItems="center"
						space={4}
					>
						<MedicalHistoryIcon />
						<VStack>
							<Text bold fontSize={20}>
								Dr {name}
							</Text>
							{/* TODO: specify the correct time for appointment */}

							<HStack>
								<Text bold color="#747F9E">
									{friendlyFormatDate(date) + ", "}
								</Text>
								<Text bold color="#747F9E">
									{timeSlots[0]}
								</Text>
							</HStack>
							{/* TO DO - CHANGE TO SHOW STATUS */}
							<Text italic>Online</Text>
						</VStack>
					</HStack>
				</VStack>
				<HStack>
					<Pressable onPress={() => NavKey.AppointmentInfoScreen}>
						<HStack alignItems="center">
							<Text fontSize={15} color={"#561BB3"}>
								Join/Edit
							</Text>
							<Icon size={5}>
								<ArrowIcon_Next size={5} />
							</Icon>
						</HStack>
					</Pressable>
				</HStack>
			</HStack>
		</VStack>
	);
};

const DoctorHome = () => {
	const navigation = useNavigation();

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
			<ScrollView width="100%">
				{/* Welcome section */}
				<VStack space={2} paddingTop={2} marginX={5}>
					<Text color="#B0B3C7" fontSize="md">
						{moment().format("D MMMM YYYY")}
					</Text>
					<Heading fontSize="3xl">Hi, Dr. Mohamedali</Heading>
				</VStack>

				{/* Section to render upcoming appointments if any.
					NOTE: To prevent re-rendering, dont use inline if statements
					*/}
				<Box marginX={5} paddingBottom={1}>
					<NextAppointmentsSection />
					<TodayAppointmentsSection />
					<UpcomingAppointmentsSection />
				</Box>
			</ScrollView>
		</MainContainer>
	);
};

export default DoctorHome;
