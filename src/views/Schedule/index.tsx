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
import { colors } from "../../contants/colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Pressable } from "react-native";
import UpdateClock from "../../assets/icons/UpdateClock";
import Card_PurpleIcon from "../../assets/icons/Card_PurpleIcon";
import { Colors } from "react-native/Libraries/NewAppScreen";
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

const Schedule: React.FC = () => {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");
	const hasUpcomingAppointment = true;
	return (
		<Box flex={1}>
			{/* <StatusBar barStyle="dark-content" backgroundColor={"#fff"} /> */}
			<ScrollView>
				<Stack
					backgroundColor={colors.primary}
					borderBottomRadius={36}
					height={height / 3.5}
					position="absolute"
					top={0}
					left={0}
					right={0}
				></Stack>
				<Stack paddingBottom={10}>
					<View alignItems="center" paddingY={20}>
						<HStack paddingX={5}>
							<Stack flex={2.2} alignItems="flex-end">
								<Text color="white" fontSize={35}>
									Schedule
								</Text>
							</Stack>

							<Stack
								justifyContent="center"
								alignItems="flex-end"
								flex={1}
							>
								<Pressable>
									<Stack
										backgroundColor="white"
										borderRadius={10}
										padding={1}
										alignSelf="center"
									>
										<Icon>
											<UpdateClock />
										</Icon>
									</Stack>
								</Pressable>
							</Stack>
						</HStack>
					</View>

					<Stack alignItems="center">
						<Box bg="white" shadow={2} rounded={10} width="90%">
							<Stack
								style={{
									paddingHorizontal: 5,
									paddingVertical: 10,
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
												<Icon
													alignSelf="center"
													size={90}
												>
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
					</Stack>

					<Spacer size={30} />

					<UpcommingAppointments />
				</Stack>
			</ScrollView>
		</Box>
	);
};

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
						<Text fontSize="xl" bold>
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

export default Schedule;
