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
	useToast,
} from "native-base";
import React from "react";
import { useMutation, useQuery } from "react-query";

import AccountIcon from "../../../assets/icons/AccountIcon";
import GenderIcon from "../../../assets/icons/GenderIcon";
import PenEditIcon from "../../../assets/icons/PenEditIcon";
import WhatsAppLogo from "../../../assets/icons/WhatsAppLogo";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { StatusAppointmentAlert } from "../../../components/core/appointment";
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ConsultantListItem } from "../../../components/consultant-list-item";
import { FacilityListItem } from "../../../components/facilities-list-item";
import { colors } from "../../../constants/colors";

import { HomeNavKey } from "./_navigator";
import { API_ROOT, getAppointmentDetails } from "../../../api";
import axios from "axios";


const cancellAppointment = async (id: string) => {
	console.log("Appointment route ", `${API_ROOT}/v0/appointment/${id}/cancel`)
	return axios.put(`${API_ROOT}/v0/appointment/${id}/cancel`, {}).then(res => {
		console.log("Whats the response ", res)
	}).catch(e => {
		console.log("Cancel appointment error ", e.response)
		throw Error("Something went wrong in cancelling appointment ")
	})
}
export const CancelAppointment = ({ modalVisible, setModalVisible, appointmentId }: { modalVisible: boolean, setModalVisible: (state: boolean) => void, appointmentId: string }) => {
	const navigation = useNavigation()
	const toast = useToast()
	const { mutate: cancel, error, isLoading } = useMutation(() => cancellAppointment(appointmentId), {
		onSuccess: (args) => {
			console.log("Successfuly cancelled appointment")
			toast.show({
				title: "Appointment successfully cancelled"
			})
			navigation.navigate(HomeNavKey.HomeScreen)
		},
		onError: (args) => {
			console.log("Oops ", args)
			toast.show({
				title: "Something went wrong in cancelling the appointment, Please try again after a while"
			})
		}
	})

	const onCancelAppointment = () => {
		Alert.alert(
			"Submit Request",
			"Are you sure you want to cancell this appointment",
			[
				{ text: "No", onPress: () => { } },
				{
					text: "Yes",
					onPress: () => {
						cancel()
					},
				},
			]
		);
	}
	console.log("Appointment id : ", appointmentId)
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
							isLoading={isLoading}
							disabled={isLoading}
							onPress={onCancelAppointment}
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
	const { cid, pid, id } = appointment
	const {
		status,
		data,
		error,
		isLoading,
	} = useQuery(["appointmentDetails", cid, pid], () => getAppointmentDetails({ cid, pid }));

	const [modalVisible, setModalVisible] = React.useState(false)

	const handleCancelAppointment = () => {
		setModalVisible(!modalVisible)
	}

	if (isLoading) return <Text>Loading...</Text>
	if (error) return <Text>Something went wrong</Text>




	// assumptation is that the appointment must me in a list of all Appointments, 
	// to be fixed later on ,
	// where we might need to fetch single appointment only
	const currentAppointment = data?.filter(data => data.id === id)[0]

	console.log("Current appointment Data")
	console.log(JSON.stringify(currentAppointment, null, 3))
	// return null
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
			<CancelAppointment appointmentId={currentAppointment?.id || ""} modalVisible={modalVisible} setModalVisible={setModalVisible} />
			<VStack testID="AppointmentInfo"
				flex={1}
				width="100%"
				paddingX={5}
				space={5}
				marginTop={5}
				marginBottom={10}
			>
				{/* NOTE: This is supposed to render.... regardless */}
				{/* <DateTimeCardRender /> */}
				<View width="100%">
					<StatusAppointmentAlert time={currentAppointment?.date || ""} type={currentAppointment?.type || "offline"} status={currentAppointment?.status} />
				</View>

				<HStack justifyContent="space-between">
					<Pressable onPress={() => {
						navigation.navigate(HomeNavKey.EditAppointment, { appointment: data })
					}}>
						<HStack space={2}>
							<PenEditIcon size={4} />
							<Text fontSize="sm">Edit Appointment</Text>
						</HStack>
					</Pressable>

					<Pressable
						onPress={() => {
							handleCancelAppointment()
						}}
					>
						<Text style={{ color: "red" }} fontSize="sm">
							Cancel Appointment
						</Text>
					</Pressable>
				</HStack>

				{currentAppointment?.type === "online" ?
					<Button
						style={{ backgroundColor: "#24D626" }}
						borderRadius={20}
						onPress={() => {
							navigation.navigate(HomeNavKey.PatientVideoCallScreen)
						}}
					>
						Join Consultation
					</Button>
					:
					<FacilityListItem
						onPress={() => { }}
						key={currentAppointment?.facility.id}
						facility={currentAppointment?.facility}
					/>
				}



				<ConsultantListItem
					key={currentAppointment?.consultant?.id}
					consultant={
						{
							clinicianType: currentAppointment?.consultant?.clinicianType || "",
							gender: currentAppointment?.consultant?.gender || "male",
							id: currentAppointment?.consultant?.id || "",
							name: currentAppointment?.consultant?.name || "",
							facility: { name: currentAppointment?.facility?.name || "", address: currentAppointment?.facility?.address || "" },
							specialities: currentAppointment?.consultant?.specialities || [""],
							rating: currentAppointment?.consultant?.rating || 0,
							ratedBy: currentAppointment?.consultant?.ratedBy || 0,
						}
					}
					onPress={() => { }}
				/>
				{/* NOTE: Abstracting away makes difficult to deal with */}
				<VStack
					space={5}
					shadow={2}
					rounded={10}
					bg="white"
					paddingX={5}
					paddingY={5}
				>
					<Text bold fontSize="xl">
						Symptoms
					</Text>
					<HStack space={4} flexWrap="wrap">
						{currentAppointment?.aboutVisit.symptoms.map(symptom => (
							<Box
								rounded="xl"
								bg={"#B0B3C7"}
								flex={1}
								alignItems="center"
								paddingY={2}

							>
								<Text textAlign="center" color={"white"}>{symptom}</Text>
							</Box>
						))}


					</HStack>

					<Text bold fontSize="lg">
						Other Notes
					</Text>
					<Text fontSize={13}>
						{currentAppointment?.aboutVisit.complaint}
					</Text>
				</VStack>
			</VStack>
		</MainContainer>
	);
}
