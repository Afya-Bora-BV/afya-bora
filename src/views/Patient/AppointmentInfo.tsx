import {
	ArrowBackIcon,
	Box,
	Button,
	Heading,
	HStack,
	Modal,
	useToast,
	View,
	VStack,
	Spinner,
} from "native-base";
import React from "react";
import MainContainer from "../../components/containers/MainContainer";
import { StatusAppointmentAlert } from "../../components/core/appointment";
import { Alert, Pressable, ToastAndroid } from "react-native";
import { IconContainer } from "../../components/misc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "react-query";
import { Spacer } from "../../components/Spacer";
import { HomeNavKey } from ".";
import PenEditIcon from "../../assets/icons/PenEditIcon";
import firestore from "@react-native-firebase/firestore";
import { FacilityListItem } from "../../components/facilities-list-item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import appointment, {
	setDate,
	setTimeRange,
} from "../../store/slices/appointment";
import { ConsultantListItem } from "../../components/consultant-list-item";
import { colors } from "../../constants/colors";
import { Text } from "../../components/text";
import { Appointment } from "../../types";

// TODO: to transfer to the firebase functions
const cancellAppointment = async (id: string) => {
	// logic for cancelling the appointment here
	console.log("Ready to cancel the appointment");
	try {
		await firestore().collection("appointments").doc(id).update({
			status: "cancelled",
		});
	} catch (e) {
		throw new Error("Failed to cancel the appointment");
	}
};
export const CancelAppointmentButton = ({
	appointmentId,
}: {
	appointmentId: string;
}) => {
	const navigation = useNavigation();
	const toast = useToast();
	const {
		mutate: cancel,
		error,
		isLoading,
	} = useMutation(() => cancellAppointment(appointmentId), {
		onSuccess: (args) => {
			console.log("Successfuly cancelled appointment");
			ToastAndroid.show(
				"Appointment successfully cancelled",
				ToastAndroid.SHORT
			);
			navigation.navigate(HomeNavKey.HomeScreen);
		},
		onError: (args) => {
			console.log("Oops ", args);
			toast.show({
				title: "Something went wrong in cancelling the appointment, Please try again after a while",
			});
		},
	});

	const onCancelAppointment = () => {
		Alert.alert(
			"Submit Request",
			"Are you sure you want to cancell this appointment",
			[
				{ text: "No", onPress: () => {} },
				{
					text: "Yes",
					onPress: () => {
						cancel();
					},
				},
			]
		);
	};
	console.log("Appointment id : ", appointmentId);
	return (
		<Pressable
			onPress={() => {
				onCancelAppointment();
			}}
		>
			{isLoading ? (
				<Spinner />
			) : (
				<Text
					tx="appointmentInfo.cancelAppointment"
					style={{ color: "red" }}
					fontSize="sm"
				>
					Cancel Appointment
				</Text>
			)}
		</Pressable>
	);
};

const EditAppointmentButton = ({
	appointmentId,
	appointment,
}: {
	appointmentId: string;
	appointment: Appointment;
}) => {
	const navigation = useNavigation();

	const goToEditAppointment = () => {
		setFormDefaultValues();
		navigation.navigate(HomeNavKey.EditAppointment, {
			appointment: appointment,
		});
	};

	const dispatch = useDispatch();

	const setFormDefaultValues = () => {
		dispatch(setTimeRange(appointment.timeRange));
		dispatch(setDate(new Date(appointment.utcDate)));
	};

	if (appointment?.status === "accepted") {
		return null;
	}

	return (
		<Pressable
			onPress={() => {
				goToEditAppointment();
			}}
		>
			<HStack space={2}>
				<PenEditIcon size={4} />
				<Text tx="appointmentInfo.editAppointment" fontSize="sm">
					Edit Appointment
				</Text>
			</HStack>
		</Pressable>
	);
};
export default function AppointmentInfo() {
	const navigation = useNavigation();

	const route = useRoute<any>();

	const { appointment: data } = route?.params;

	const { cid, pid } = data;

	console.log("Appointment : ");
	console.log(JSON.stringify(data?.consultant, null, 3));
	return (
		<MainContainer
			title="appointmentInfo.appointmentInfo"
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
				<View width="100%">
					<StatusAppointmentAlert
						hours={data?.time || ""}
						time={data?.utcDate || ""}
						type={data?.type || "offline"}
						status={data?.status}
					/>
				</View>

				{data.rejectionReason && (
					<View bg="white" borderRadius={8} my={2} shadow={2} p={5}>
						<VStack>
							<Text
								fontSize={"xl"}
								fontWeight="medium"
								// tx="common.otherNotes"
							>
								Reason For Rejection
							</Text>
							<Text>{data?.rejectionReason}</Text>
						</VStack>
					</View>
				)}

				<HStack justifyContent="space-between">
					<EditAppointmentButton
						appointmentId={data?.id || ""}
						appointment={data || {}}
					/>
					<CancelAppointmentButton appointmentId={data?.id || ""} />
				</HStack>
				<VStack mt={2} space={4}>
					{!(data?.type === "online") && (
						<FacilityListItem facility={data?.facility} />
					)}

					{data?.consultant && (
						<ConsultantListItem consultant={data?.consultant} />
					)}
				</VStack>

				<View bg="white" borderRadius={10} mt={2} shadow={2} p={5}>
					<Text
						tx="common.speciality"
						fontSize={"xl"}
						fontWeight="medium"
					>
						Speciality
					</Text>
					<Spacer size={10} />
					<HStack space={4} flexWrap="wrap">
						{data?.speciality ? (
							<Box
								rounded="xl"
								bg={"#B0B3C7"}
								flex={1}
								// alignItems="center"
								padding={2}
							>
								<Text textAlign="left" color={"white"}>
									{data?.speciality}
								</Text>
							</Box>
						) : (
							<Text></Text>
						)}
					</HStack>

					<VStack mt={6}>
						<Text
							fontSize={"xl"}
							tx="common.otherNotes"
							fontWeight="medium"
						>
							Other Notes
						</Text>
						<Text>{data?.aboutVisit?.complaint}</Text>
					</VStack>
				</View>
				<VStack>
					{data?.type === "online" && data?.status === "accepted" && (
						<Button
							bgColor={colors.primary}
							onPress={() => {
								navigation.navigate(
									HomeNavKey.RemoteConsultation,
									{
										roomId: data?.roomId,
									}
								);
							}}
						>
							Join
						</Button>
					)}
				</VStack>
			</VStack>
		</MainContainer>
	);
}
