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
	Stack,
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
import { useAuth } from "../../contexts/AuthContext";
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import DoctorIcon from "../../assets/icons/DoctorIcon"

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
			"Are you sure you want to cancel this appointment?",
			[
				{ text: "No", onPress: () => { } },
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
			disabled={isLoading}
			onPress={() => {
				onCancelAppointment();
			}}
		>
			{isLoading ? (
				<Spinner />
			) :


				(
					<HStack space={2}
						style={{ backgroundColor: "#FFFFFF", }}
						borderWidth={1}
						borderColor={"#FF5A5B"}
						px={12} py={3}
						alignItems="center"
						color={colors.primary}
						borderRadius="md"

					>
						<Text tx="appointmentInfo.cancelAppointment" fontSize="sm" color={"#FF5A5B"}>
							Cancel Appointment
						</Text>
					</HStack>

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
			<HStack space={2}
				style={{ backgroundColor: "#FFFFFF", }}
				borderWidth={1}
				borderColor={colors.primary}
				px={12} py={3}
				alignItems="center"
				color={colors.primary}
				borderRadius="md"
			>
				<PenEditIcon size={4} color={colors.primary} />
				<Text tx="appointmentInfo.editAppointment" fontSize="sm" color={colors.primary}>
					Edit Appointment
				</Text>
			</HStack>


		</Pressable>
	);
};


export default function AppointmentInfo() {
	const navigation = useNavigation();

	const route = useRoute<any>();
	const { profile } = useAuth()

	const { appointment: data } = route?.params;

	console.log("Appointment : ");
	console.log(JSON.stringify(data?.consultant, null, 3));


	const openVirtualAppointment = async () => {
		const PATIENT_ROLE = "patient"
		const PATIENT_CALL_DOMAIN = `https://afyabora.app.100ms.live/preview/${data?.callRoomId}/${PATIENT_ROLE}?name=${profile?.name}`

		console.log("Patient meeting url")
		console.log(PATIENT_CALL_DOMAIN)

		// using webview
		// navigation.navigate(HomeNavKey.PatientCall, {
		// 	url: PATIENT_CALL_DOMAIN
		// });

		// using in -app browser
		try {
			const url = PATIENT_CALL_DOMAIN
			if (await InAppBrowser.isAvailable()) {
				const result = await InAppBrowser.open(url, {
					// iOS Properties
					dismissButtonStyle: 'cancel',
					preferredBarTintColor: '#453AA4',
					preferredControlTintColor: 'white',
					readerMode: false,
					animated: true,
					modalPresentationStyle: 'fullScreen',
					modalTransitionStyle: 'coverVertical',
					modalEnabled: true,
					enableBarCollapsing: false,
					// Android Properties
					showTitle: true,
					toolbarColor: colors.primary,
					secondaryToolbarColor: 'black',
					navigationBarColor: 'black',
					navigationBarDividerColor: 'white',
					enableUrlBarHiding: true,
					enableDefaultShare: true,
					forceCloseOnRedirection: false,
					showInRecents: true,
					// Specify full animation resource identifier(package:anim/name)
					// or only resource name(in case of animation bundled with app).
					animations: {
						startEnter: 'slide_in_right',
						startExit: 'slide_out_left',
						endEnter: 'slide_in_left',
						endExit: 'slide_out_right'
					},
					headers: {
						'my-custom-header': 'my custom header value'
					}
				})

				ToastAndroid.show(
					JSON.stringify(result),
					3000
				);
				console.log(result)
			} else {
				navigation.navigate(HomeNavKey.PatientCall, {
					url: PATIENT_CALL_DOMAIN
				});
			}

		} catch (error) {
			ToastAndroid.show(
				"Something went wrong on joining the call",
				3000
			);
			console.log("Error : ", error)
		}

	}

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
				space={4}
				marginTop={5}
				marginBottom={10}
			>
				<View width="100%">
					<StatusAppointmentAlert
						time={data?.time || ""}
						date={data?.date || new Date()}
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

				<VStack mt={2} space={4}>
					{data?.fid && (
						<FacilityListItem facility={data?.facility} fid={data?.fid} label={true} />
					)}

					{data?.consultant && (
						<ConsultantListItem consultant={data?.consultant} />
					)}
				</VStack>

				<View bg="white" borderRadius={10} mt={2} shadow={2} p={5}>
					<Text
						tx="common.speciality"
						fontSize={"md"}
						fontWeight="medium"
					>
						Speciality
					</Text>
					<Spacer size={10} />
					<HStack space={4} flexWrap="wrap">
						{data?.speciality ? (
							<Box
								rounded={4}
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
							fontSize={"md"}
							tx="common.otherNotes"
							fontWeight="medium"
						>
							Other Notes
						</Text>
						<Text>{data?.aboutVisit?.complaint}</Text>
					</VStack>
				</View>

				<HStack justifyContent="space-between" shadow={2} borderRadius={8} backgroundColor={"#FFFFFF"} px={4} py={2}>
					<EditAppointmentButton
						appointmentId={data?.id || ""}
						appointment={data || {}}
					/>
					<CancelAppointmentButton appointmentId={data?.id || ""} />
				</HStack>

				<VStack>
					{(data?.type === "online" && data?.status === "accepted" && data?.callRoomId)
						&&
						(
							<Stack>
								<Button
									mb={3}
									bg={colors.primary}
									onPress={openVirtualAppointment}
									rounded={4}
									h={50}
								>
									<Text color="white" tx="">
										Join Consultation
									</Text>
								</Button>
							</Stack>
						)
					}

				</VStack>
			</VStack>
		</MainContainer>
	);
}
