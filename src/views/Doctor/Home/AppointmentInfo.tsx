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
	Modal,
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
import { useRoute } from "@react-navigation/native";
import { getAppointmentDetails } from "../../../api";
import { NavStack, HomeNavKey } from './_navigator'

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

const CancelAppointment = ({ modalVisible, setModalVisible }: { modalVisible: boolean, setModalVisible: (state: boolean) => void }) => {
	return (
		<Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
			<Modal.Content>
				<Modal.CloseButton />
				<Modal.Header>Cancellation of appointment</Modal.Header>
				<Modal.Body >
					<Text textAlign="center">
						Are you sure you want to cancel this appointment?
					</Text>


					<HStack mt={6} justifyContent="space-between">
						<Button
							h={44}
							w={144}
							borderRadius={24}
							variant="outline"
							onPress={() => {
								setModalVisible(!modalVisible)
							}}
						>No</Button>
						<Button
							h={44}
							w={144}
							borderRadius={24}
							onPress={() => {
								console.log("Cancelling the appointment here ... ")
							}}
						>
							Yes
						</Button>
					</HStack>
				</Modal.Body>
				<Modal.Footer>


				</Modal.Footer>
			</Modal.Content>
		</Modal>
	)
}



export default function AppointmentInfo() {
	const navigation = useNavigation();


	const route = useRoute();
	const { appointment } = route?.params
	const { cid, pid } = appointment
	const {
		status,
		data: appointmentDetails,
		error,
		isLoading,
	} = useQuery(["appointmentDetails", cid, pid], () => getAppointmentDetails({ cid, pid }));

	const [modalVisible, setModalVisible] = React.useState(false)

	const handleCancelAppointment = () => {
		setModalVisible(!modalVisible)
	}

	if (isLoading) return <Text>Loading...</Text>
	if (error) return <Text>Something went wrong</Text>

	console.log("Data ")
	console.log(JSON.stringify(appointmentDetails, null, 4))
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
			<CancelAppointment modalVisible={modalVisible} setModalVisible={setModalVisible} />
			<VStack flex={1} width="100%" paddingX={5} space={5} marginTop={5} marginBottom={10}>
				{/* NOTE: This is supposed to render.... regardless */}
				{/* <DateTimeCardRender /> */}
				<View width="100%">
					<StatusAppointmentAlert time={appointmentDetails?.date} />
				</View>

				<HStack justifyContent="space-between">
					<Pressable onPress={() => console.log("Edit Appointment")}>
						<HStack space={2}>
							<PenEditIcon size={4} />
							<Text fontSize="sm">Edit Appointment</Text>
						</HStack>
					</Pressable>

					<Pressable onPress={() => handleCancelAppointment()}>
						<Text style={{ color: "red" }} fontSize="sm">
							Cancel Appointment
						</Text>
					</Pressable>
				</HStack>

				<Button
					style={{ backgroundColor: "#24D626" }}
					borderRadius={20}
					onPress={() => {
						navigation.navigate(HomeNavKey.DoctorVideoCallScreen)
					}}
				>
					Join Consultation
				</Button>

				<PatientInfo
					name="No data"
					phoneNumber="+No phone"
					gender="female"
				/>

				{/* NOTE: Abstracting away makes difficult to deal with */}
				<VStack space={5} shadow={2} rounded={10} bg="white" paddingX={5} paddingY={5}>
					<Text bold fontSize="xl">Symptoms</Text>
					<HStack space={4}>

						{appointmentDetails?.aboutVisit.symptoms.map(symptom => (
							<Box
								rounded="xl"
								bg={"#B0B3C7"}
								flex={1}
								alignItems="center"
								paddingY={2}
							>
								<Text color={"white"}>{symptom}</Text>
							</Box>
						))}


					</HStack>

					<Text bold fontSize="lg">Other Notes</Text>
					<Text fontSize={13}>
						{appointmentDetails?.aboutVisit.complaint}
					</Text>
				</VStack>
			</VStack>
		</MainContainer>
	);
};

