import {
	ArrowBackIcon,
	Box,
	Button,
	Heading,
	HStack,
	Modal,
	Text,
	useToast,
	View,
	VStack,
	Spinner
} from "native-base";
import React from "react";
import MainContainer from "../../components/containers/MainContainer";
import { StatusAppointmentAlert } from "../../components/core/appointment";
import { Alert, Pressable, ToastAndroid } from "react-native";
import { IconContainer } from "../../components/misc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_ROOT, getAppointmentDetails } from "../../api";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Spacer } from "../../components/Spacer";
import { HomeNavKey } from ".";
import PenEditIcon from "../../assets/icons/PenEditIcon";
import firestore from '@react-native-firebase/firestore';

// TODO: to transfer to the firebase functions
const cancellAppointment = async (id: string) => {
	// logic for cancelling the appointment here
	console.log("Ready to cancel the appointment")
	try {
		await firestore().collection("appointments").doc(id).update({
			status: "cancelled"
		})
	}
	catch (e) {
		throw new Error("Failed to cancel the appointment")
	}

}
export const CancelAppointmentButton = ({ appointmentId }: { appointmentId: string }) => {
	const navigation = useNavigation()
	const toast = useToast()
	const { mutate: cancel, error, isLoading } = useMutation(() => cancellAppointment(appointmentId), {
		onSuccess: (args) => {
			console.log("Successfuly cancelled appointment")
			ToastAndroid.show("Appointment successfully cancelled", ToastAndroid.SHORT);
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
		<Pressable
			onPress={() => {
				onCancelAppointment()
			}}
		>
			{isLoading ?
				<Spinner />
				:
				<Text style={{ color: "red" }} fontSize="sm">
					Cancel Appointment
				</Text>}

		</Pressable>
	)
}

export default function AppointmentSpecifics() {
	const navigation = useNavigation();

	const route = useRoute();

	const { appointment: data } = route?.params;

	const { cid, pid } = data;
	// const { status, data, error, isLoading } = useQuery(
	// 	["appointmentDetails", cid, pid],
	// 	() => getAppointmentDetails({ cid, pid })
	// );

	const [modalVisible, setModalVisible] = React.useState(false)

	const handleCancelAppointment = () => {
		setModalVisible(!modalVisible)
	}

	console.log("Appointment : ")
	console.log(JSON.stringify(data, null, 3))
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

			<VStack
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
					<StatusAppointmentAlert
						time={data?.date || ""}
						type={data?.type || "offline"}
						status={data?.status}
					/>
				</View>

				<HStack justifyContent="space-between">
					<Pressable onPress={() => {
						console.log("To edit appointment info : ")
					}}>
						<HStack space={2}>
							<PenEditIcon size={4} />
							<Text fontSize="sm">Edit Appointment</Text>
						</HStack>
					</Pressable>

					<CancelAppointmentButton appointmentId={data?.id || ""} />
				</HStack>
				<View bg="white" borderRadius={10} mt={8} shadow={2} p={5}>
					<Text fontSize={"2xl"}>Symptoms</Text>
					<Spacer size={10} />
					<HStack space={4} flexWrap="wrap">
						{data?.aboutVisit?.symptoms?.map((symptom) => (
							<Box
								rounded="xl"
								bg={"#B0B3C7"}
								flex={1}
								alignItems="center"
								paddingY={2}
							>
								<Text textAlign="center" color={"white"}>
									{symptom}
								</Text>
							</Box>
						))}
					</HStack>
				</View>
			</VStack>
		</MainContainer>
	);
}
