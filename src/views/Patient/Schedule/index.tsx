import React from "react";
import {
	Box,
	Center,
	Heading,
	ScrollView,
	Stack,
	StatusBar,
	View,
	Text,
	HStack,
	Icon,
	VStack,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { Dimensions, Pressable } from "react-native";
import UpdateClock from "../../../assets/icons/UpdateClock";
import Card_PurpleIcon from "../../../assets/icons/Card_PurpleIcon";
import Card_RedIcon from "../../../assets/icons/Card_RedIcon";
import SquareCheckIcon from "../../../assets/icons/SquareCheckIcon";
import { Spacer } from "../../../components/Spacer";
import { PrimaryButton } from "../../../components/button";
import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../../internals/appointment/context";
import { useQuery } from "react-query";

import MedicalHistoryIcon from "../../../assets/icons/MedicalHistory";
import AlternateContainer from "../../../components/containers/AlternateContainer";
import { IconContainer } from "../../../components/misc";
import { AppointmentAlert } from "../../../components/core/appointment";

import { NavKey as BookAppointmentNavKey } from "../Home/BookAppointment/_navigator";
import { TabNavKey as MainNavKey, TabNavKey } from "../_navigator";
import { friendlyFormatDate } from "../../../utils";

export default function Schedule() {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");
	return (
		<AlternateContainer
			rightSection={() => (
				<Pressable>
					<IconContainer>
						<UpdateClock />
					</IconContainer>
				</Pressable>
			)}
			title="Schedule"
			titleColor="#FFF"
			barStyle="dark-content"
			backdropHeight={height / 5.6}
			bgColor="#7065E4"
		>
			<VStack alignItems="center" marginX={10} space={10}>
				<Box bg="white" shadow={2} rounded={25} width="100%">
					<Stack
						style={{
							paddingHorizontal: 1,
							paddingVertical: 15,
						}}
					>
						{/* TO DO - MOVE TO COMPONENTS FOLDER */}
						<HStack justifyContent="space-between">
							<VStack flex={1} alignItems="center">
								<Pressable>
									<Icon size={90}>
										<Card_PurpleIcon size={20} />
									</Icon>
									<Text color={"#7065E4"} bold>
										Wait for pay
									</Text>
								</Pressable>
							</VStack>

							<VStack flex={1} alignItems="center">
								<Pressable>
									<Stack alignSelf="center">
										<Icon alignSelf="center" size={90}>
											<Card_RedIcon size={20} />
										</Icon>
									</Stack>
									<Text
										alignSelf="center"
										color={"grey"}
										bold
									>
										Endocrine
									</Text>
								</Pressable>
							</VStack>

							<VStack flex={1} alignItems="center">
								<Pressable>
									<Icon size={90}>
										<SquareCheckIcon size={20} />
									</Icon>
									<Text
										alignSelf="center"
										color={"grey"}
										bold
									>
										Dentist
									</Text>
								</Pressable>
							</VStack>
						</HStack>
					</Stack>
				</Box>
				<UpcommingAppointments />
			</VStack>
		</AlternateContainer>
	);
}

const UpcommingAppointments: React.FC = () => {
	const navigation = useNavigation();
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
	if (data === undefined || data.length === 0)
		return (
			<Stack>
				<Box alignItems="center" paddingX={10}>
					<Stack justifyContent="center">
						<Text textAlign="center" fontSize="xl" bold>
							You do not have an appointment!
						</Text>
					</Stack>
					<Spacer size={10} />
					<Stack alignContent="center">
						<Text textAlign="center" fontSize="lg" color="grey">
							Book a health care service right away for you and
							your family!
						</Text>
					</Stack>
				</Box>

				<Box padding={"5%"}>
					<PrimaryButton
						text={"Make an appointment"}
						shadow={5}
						onPress={() => {
							navigation.navigate(TabNavKey.HomeView, {
								screen: BookAppointmentNavKey.SetAppointmentTimeScreen,
							});
						}}
					/>
				</Box>
			</Stack>
		);

	return (
		<VStack space={4} marginX={10}>
			<Heading fontSize="md">Upcoming Appointments</Heading>
			<VStack paddingX={4} space={3}>
				{data.map((appointment) => (
					<UpcomingAppointmentsAlert appointment={appointment} />
				))}
			</VStack>
		</VStack>
	);
};

const UpcomingAppointmentsAlert: React.FC<{
	appointment: DemoAppointmentType;
}> = ({ appointment }) => {
	const {
		dateTime: { date, timeSlots },
	} = appointment;

	return (
		<AppointmentAlert
			consultantName={appointment.consultant.name}
			appointmentDate={
				friendlyFormatDate(`${date}`) + ", " + `${timeSlots[0]}`
			}
			facilityName={
				appointment.appointmentType === "offline"
					? appointment.consultant.hospital
					: "Online Consultation"
			}
			facilityLocation={
				appointment.appointmentType === "offline"
					? appointment.consultant.region
					: ""
			}
		/>
	);
};
