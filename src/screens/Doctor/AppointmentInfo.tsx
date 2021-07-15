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
} from "native-base";
import React from "react";
import { useQuery } from "react-query";
import { NavKey } from ".";
import AccountIcon from "../../assets/icons/AccountIcon";
import ArrowIcon_Next from "../../assets/icons/ArrowIcon_Next";
import GenderIcon from "../../assets/icons/GenderIcon";
import MedicalHistoryIcon from "../../assets/icons/MedicalHistory";
import PenEditIcon from "../../assets/icons/PenEditIcon";
import WhatsAppLogo from "../../assets/icons/WhatsAppLogo";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import { Spacer } from "../../components/Spacer";
import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../internals/appointment/context";

const MONTH_NAMES = [
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

function friendlyFormatDate(timeStamp: Date | string | number) {
	const dateObj = new Date(timeStamp);
	const d = new Date();
	const date = dateObj.getDate();
	const month = dateObj.getMonth();
	const year = dateObj.getFullYear();
	const monthName = MONTH_NAMES[d.getMonth()];

	return `${date} ${monthName}`;
}

const DateTimeCard: React.FC<{
	appointment: DemoAppointmentType;
}> = ({ appointment }) => {
	const {
		dateTime: { timeSlots, date },
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
							<Text italic>Online Consultation</Text>
						</VStack>
					</HStack>
				</VStack>
				<Stack rounded={10} backgroundColor={"#A9FA0F"} padding={1.5}>
					<Text fontSize={12} color={"#24D626"}>
						Confirmed
					</Text>
				</Stack>
			</HStack>
		</VStack>
	);
};

const DateTimeCardRender = () => {
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
			{data?.map((appointment) => (
				<DateTimeCard appointment={appointment} />
			))}
		</VStack>
	);
};

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
			<Stack space={5}>
				<Text>Patient Information</Text>
				<HStack space={8}>
					<AccountIcon size={5} />
					<Text>{name}</Text>
				</HStack>

				<HStack space={8}>
					<WhatsAppLogo size={5} />
					<Text>{phoneNumber}</Text>
				</HStack>

				<HStack space={8}>
					<GenderIcon size={5} />
					<Text>Sex: {gender}</Text>
				</HStack>

				<HStack space={8}>
					<AccountIcon size={5} />
					<Text>DOB: {dob}</Text>
				</HStack>
			</Stack>
		</Stack>
	);
};

type PatientAdditionalInfoProps = {};

const PatientAdditionalInfo: React.FC<PatientInfoProps> = ({}) => {
	return (
		<Stack shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>
			<Stack space={2}>
				<Text bold>Symptoms</Text>
				<HStack space={8}>
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

				<Spacer size={5} />

				<Text bold>Other Notes</Text>
				<Text fontSize={13}>
					I have had a really bad stomach ache for a long time and I
					am not sure what is happening. I took some medicine but it
					didn’t help.
				</Text>
			</Stack>
		</Stack>
	);
};

const AppointmentInfo = () => {
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
			<VStack paddingX={10} space={2} paddingBottom={1}>
				<DateTimeCardRender />

				<HStack justifyContent="space-between">
					<Pressable>
						<HStack>
							<Icon size={3}>
								<PenEditIcon size={3} />
							</Icon>

							<Text fontSize={11}>Edit Appointment</Text>
						</HStack>
					</Pressable>

					<Pressable>
						<Text style={{ color: "red" }} fontSize={11}>
							Cancel Appointment
						</Text>
					</Pressable>
				</HStack>

				<Spacer size={10} />

				<Button
					style={{ backgroundColor: "#24D626" }}
					borderRadius={40}
				>
					Join Consultation
				</Button>

				<PatientInfo
					name="Ally Salim"
					phoneNumber="+255 (0) 756 922 868"
					gender="male"
				/>
				<PatientAdditionalInfo />
			</VStack>
		</MainContainer>
	);
};

export default AppointmentInfo;
