import { useNavigation } from "@react-navigation/core";
import {
	ArrowBackIcon,
	HStack,
	Pressable,
	VStack,
	Text,
	Icon,
	Stack,
	Button,
	Box,
	View,
	Heading,
} from "native-base";
import React from "react";
import { useQuery } from "react-query";
import { NavKey } from "../_navigator";
import AccountIcon from "../../../assets/icons/AccountIcon";
import GenderIcon from "../../../assets/icons/GenderIcon";
import PenEditIcon from "../../../assets/icons/PenEditIcon";
import WhatsAppLogo from "../../../assets/icons/WhatsAppLogo";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { Spacer } from "../../../components/Spacer";
import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../../internals/appointment/context";
import { StatusAppointmentAlert } from "../../../components/core/appointment";
import { Alert } from "react-native";


// const DateTimeCard: React.FC<{
// 	appointment: DemoAppointmentType;
// }> = ({ appointment }) => {
// 	const {
// 		dateTime: { timeSlots, date },
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
// 							<Text italic>Online Consultation</Text>
// 						</VStack>
// 					</HStack>
// 				</VStack>
// 				<Stack rounded={10} backgroundColor={"#A9FA0F"} padding={1.5}>
// 					<Text fontSize={12} color={"#24D626"}>
// 						Confirmed
// 					</Text>
// 				</Stack>
// 			</HStack>
// 		</VStack>
// 	);
// };

type PatientInfoProps = {
	name: string;
	phoneNumber: string;
	gender: "male" | "female";
	dob: Date;
};

const PatientInfo: React.FC<PatientInfoProps> = ({
	name,
	phoneNumber,
	gender,
	dob,
}) => {
	return (
		<Stack shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>
			<VStack space={5}>
				<Heading fontSize="xl">Patient Information</Heading>
				<HStack space={4}>
					<AccountIcon size={5} />
					<Text>{name}</Text>
				</HStack>

				<HStack space={4}>
					<WhatsAppLogo size={5} />
					<Text>{phoneNumber}</Text>
				</HStack>

				<HStack space={4}>
					<GenderIcon size={5} />
					<VStack>
						<Text>Sex: {gender}</Text>
						<Text>DOB: 01/01/1932 (15 years)</Text>
					</VStack>
				</HStack>
			</VStack>
		</Stack>
	);
};

// type PatientAdditionalInfoProps = {};
// const PatientAdditionalInfo: React.FC<PatientInfoProps> = () => {
// 	return (
// 		<VStack space={5} shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>
// 			<Text bold fontSize="lg">Symptoms</Text>
// 			<HStack space={4}>
// 				<Box
// 					rounded="xl"
// 					bg={"#B0B3C7"}
// 					flex={1}
// 					alignItems="center"
// 					paddingY={2}
// 				>
// 					<Text color={"white"}>Chest Pain</Text>
// 				</Box>
// 				<Box
// 					rounded="xl"
// 					bg={"#B0B3C7"}
// 					flex={1}
// 					alignItems="center"
// 					paddingY={2}
// 				>
// 					<Text color={"white"}>Genital Itching</Text>
// 				</Box>
// 			</HStack>

// 			<Text bold fontSize="lg">Other Notes</Text>
// 			<Text fontSize={13}>
// 				I have had a really bad stomach ache for a long time and I
// 				am not sure what is happening. I took some medicine but it
// 				didn’t help.
// 			</Text>
// 		</VStack>
// 	);
// };

export default function AppointmentInfo () {
	const navigation = useNavigation();

	return (
		<MainContainer
			title="Appointment Info"
			leftSection={
				// Go back if can go back
				navigation.canGoBack()
					? () => (
							<Pressable onPress={() => navigation.goBack()}>
								<IconContainer>
									<ArrowBackIcon size={6} color="#561BB3" />
								</IconContainer>
							</Pressable>
					  )
					: undefined
			}
		>
			<VStack flex={1} width="100%" paddingX={5} space={5} marginTop={5} marginBottom={10}>
				{/* NOTE: This is supposed to render.... regardless */}
				{/* <DateTimeCardRender /> */}
				<View width="100%">
					<StatusAppointmentAlert />
				</View>

				<HStack justifyContent="space-between">
					<Pressable onPress={() => console.log("Edit Appointment")}>
						<HStack space={2}>
							<PenEditIcon size={4}/>
							<Text fontSize="sm">Edit Appointment</Text>
						</HStack>
					</Pressable>

					<Pressable onPress={() => console.log("Cancel Appointment")}>
						<Text style={{ color: "red" }} fontSize="sm">
							Cancel Appointment
						</Text>
					</Pressable>
				</HStack>

				<Button
					style={{ backgroundColor: "#24D626" }}
					borderRadius={20}
					onPress={() => Alert.alert("WIP")}
				>
					Join Consultation
				</Button>

				<PatientInfo
					name="Ally Salim"
					phoneNumber="+255 (0) 756 922 868"
					gender="male"
				/>
				
				{/* NOTE: Abstracting away makes difficult to deal with */}
				<VStack space={5} shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>
					<Text bold fontSize="xl">Symptoms</Text>
					<HStack space={4}>
						<Box
							rounded="xl"
							bg={"#B0B3C7"}
							flex={1}
							alignItems="center"
							paddingY={2}
						>
							<Text color={"white"}>Chest Pain</Text>
						</Box>
						<Box
							rounded="xl"
							bg={"#B0B3C7"}
							flex={1}
							alignItems="center"
							paddingY={2}
						>
							<Text color={"white"}>Genital Itching</Text>
						</Box>
					</HStack>

					<Text bold fontSize="lg">Other Notes</Text>
					<Text fontSize={13}>
						I have had a really bad stomach ache for a long time and I
						am not sure what is happening. I took some medicine but it
						didn’t help.
					</Text>
				</VStack>
			</VStack>
		</MainContainer>
	);
};

