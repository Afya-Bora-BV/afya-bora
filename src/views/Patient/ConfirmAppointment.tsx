import React, { useState } from "react";
import {
	Text,
	Box,
	ArrowBackIcon,
	Pressable,
	Button,
	View,
	HStack,
} from "native-base";
import format from "date-fns/format";
import _ from "lodash";
import MainContainer from "../../components/containers/MainContainer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconContainer } from "../../components/misc";
import { FlatList, TouchableOpacity, Alert } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import functions from "@react-native-firebase/functions";
import firestore from '@react-native-firebase/firestore';


import { ToastAndroid } from "react-native";
import { resetAppointmentState } from "../../store/slices/appointment";
import { HomeNavKey } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAuth } from "../../contexts/AuthContext";
import { colors } from "../../constants/colors";

const ConfirmAppointment: React.FC = () => {
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);

	const { appointment } = useSelector((state: RootState) => ({
		appointment: state.appointment,
	}));

	const { user, profile, loading } = useAuth();

	const confirmSubmit = () => {
		Alert.alert(
			"Confirm Request",
			"Please submit your appointment if the information enterd is correct.",
			[
				{ text: "Cancel", onPress: () => { } },
				{
					text: "Submit",
					onPress: submit,
				},
			]
		);
	};

	const dispatch = useDispatch();

	const submit = () => {
		setIsLoading(true);
		if (user !== null || !profile) {
			const fid = appointment.facility?.id;

			const data = {
				fid,
				aboutVisit: appointment.aboutVisit,
				pid: profile?.id,
				timeRange: appointment.timeRange,
				speciality: appointment.speciality,
				type: appointment.type,
				status:"pending",
				date: new Date(
					appointment.date) || new Date(),
				rawDate: appointment.date,
				utcDate: appointment.date
					? new Date(appointment.date).toUTCString()
					: new Date().toUTCString(),
				createdAt: new Date(),
				updatedAt: new Date()
			}

			firestore()
				.collection('appointments')
				.add(data)
				.then((res) => {
					console.log('appointment  added! ', res);
					ToastAndroid.show(
						"Success! Your appointment request has been made.",
						3000
					);
					setIsLoading(false)
					dispatch(resetAppointmentState());
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: HomeNavKey.HomeScreen }],
						})
					);
				}).catch((err) => {
					console.log(err, typeof err);
					setIsLoading(false);
					if (err.code === "unauthenticated") {
						ToastAndroid.show(
							"Please login first before proceeding.",
							ToastAndroid.SHORT
						);
						return navigation.navigate(HomeNavKey.Login, {
							completingAppointment: true,
						});
					}
					ToastAndroid.show("Error. Please try again.", 3000);

				});

			// FIXME: Move function to API file
			// functions()
			// 	.httpsCallable("makeAppointment")({
			// 		// FIXME: Add a checker for fid being present
			// 		fid,
			// 		aboutVisit: appointment.aboutVisit,
			// 		pid: profile?.id,
			// 		timeRange: appointment.timeRange,
			// 		speciality: appointment.speciality,
			// 		type: appointment.type,
			// 		utcDate: new Date(
			// 			appointment.date || new Date()
			// 		).toUTCString(),
			// 	})
			// 	.then((res) => {
			// 		ToastAndroid.show(
			// 			"Success! Your appointment request has been made.",
			// 			3000
			// 		);
			// 		dispatch(resetAppointmentState());
			// 		navigation.dispatch(
			// 			CommonActions.reset({
			// 				index: 0,
			// 				routes: [{ name: HomeNavKey.HomeScreen }],
			// 			})
			// 		);
			// 	})
			// 	.catch((err) => {
			// 		console.log(err, typeof err);
			// 		setIsLoading(false);
			// 		if (err.code === "unauthenticated") {
			// 			ToastAndroid.show(
			// 				"Please login first before proceeding.",
			// 				ToastAndroid.SHORT
			// 			);
			// 			return navigation.navigate(HomeNavKey.Login, {
			// 				completingAppointment: true,
			// 			});
			// 		}
			// 		ToastAndroid.show("Error. Please try again.", 3000);
			// 	});
		} else {
			ToastAndroid.show(
				"Error confirming and validating your account. Please contact support.",
				3000
			);
		}
	};

	if (user === null) {
		navigation.navigate(HomeNavKey.Login, {
			completingAppointment: true,
		});
		return <></>;
	} else if (profile === null && !loading) {
		navigation.navigate(HomeNavKey.CreateProfile, {
			completingAppointment: true,
		});
		return <></>;
	}

	return (
		<MainContainer
			title="confirmAppointment.confirmAppointment"
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
			<View p={2}>
				<Text fontSize={"xl"} mt={4}>
					Appointment Date
				</Text>

				<HStack
					bg="white"
					borderRadius={8}
					my={2}
					shadow={2}
					p={5}
					space={"sm"}
				>
					<Icon
						size={26}
						color={"#6d28d9"}
						name={"calendar-month-outline"}
					/>
					<View>
						<Text fontSize={"xl"}>
							{format(appointment.date, "dd MMMM yyyy")}
						</Text>
						<Text color={"muted.500"}>
							{_.upperFirst(appointment.timeRange)}
						</Text>
					</View>
				</HStack>

				<Text fontSize={"xl"} mt={4}>
					Doctor Specialisation
				</Text>

				<HStack
					bg="white"
					borderRadius={8}
					my={2}
					shadow={2}
					p={5}
					space={"sm"}
				>
					<Icon
						size={26}
						color={"#6d28d9"}
						name={"hospital-box-outline"}
					/>
					<Text fontSize={"xl"}>{appointment.speciality}</Text>
				</HStack>
				<Text fontSize={"xl"} mt={4}>
					Primary reason for seeing the doctor
				</Text>

				<HStack
					bg="white"
					borderRadius={8}
					my={2}
					shadow={2}
					p={5}
					space={"sm"}
				>
					<Icon
						size={26}
						color={"#6d28d9"}
						name={"message-plus-outline"}
					/>
					<Text fontSize={"xl"}>{appointment.aboutVisit.complaint}</Text>
				</HStack>


				<Box mt={4}>
					<Button
						bg={colors.primary}
						rounded={4}
						isLoading={isLoading}
						onPress={confirmSubmit}
					>
						Submit
					</Button>
				</Box>
			</View>
		</MainContainer>
	);
};

export default ConfirmAppointment;
