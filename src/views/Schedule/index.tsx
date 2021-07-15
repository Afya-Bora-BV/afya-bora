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
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Pressable } from "react-native";
import UpdateClock from "../../assets/icons/UpdateClock";
import Card_PurpleIcon from "../../assets/icons/Card_PurpleIcon";
import Card_RedIcon from "../../assets/icons/Card_RedIcon";
import SquareCheckIcon from "../../assets/icons/SquareCheckIcon";
import { Spacer } from "../../components/Spacer";
import { PrimaryButton } from "../../components/button";
import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../internals/appointment/context";
import { useQuery } from "react-query";

import MedicalHistoryIcon from "../../assets/icons/MedicalHistory";
import AlternateContainer from "../../components/containers/AlternateContainer";
import { IconContainer } from "../../components/misc";

export default function Schedule() {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");
	const hasUpcomingAppointment = true;
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
	if (data?.length === 0)
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
						press={() => navigation.navigate("FindFacilityList")}
					/>
				</Box>
			</Stack>
		);

	console.log("appointment");
	console.log(data);
	return (
		<VStack space={4}>
			<Heading fontSize="md">Upcoming Appointments</Heading>
			{data?.map((appointment) => (
				<UpcomingAppointmentsAlert appointment={appointment} />
			))}
		</VStack>
	);
};

const UpcomingAppointmentsAlert: React.FC<{
	appointment: DemoAppointmentType;
}> = ({ appointment }) => {
	const {
		dateTime: { timeSlots },
		consultant: { name },
	} = appointment;
	return (
		<VStack>
			<HStack
				justifyContent="space-between"
				alignItems="center"
				borderRadius={6}
				borderColor="#B0B3C7"
				borderWidth={1}
				p={4}
			>
				<HStack
					justifyContent="space-between"
					alignItems="center"
					space={4}
				>
					<MedicalHistoryIcon />
					<Text>Meet Dr {name}</Text>
				</HStack>
				{/* TODO: specify the correct time for appointment */}
				<Text color="#258FBE">{timeSlots[0]}</Text>
			</HStack>
		</VStack>
	);
};
