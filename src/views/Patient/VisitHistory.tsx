import { ArrowBackIcon, View, VStack } from "native-base";
import { Text } from "react-native-svg";
import React, { useEffect, useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import {
	AppointmentAlert,
} from "../../components/core/appointment";
import { Pressable } from "react-native";
import { IconContainer } from "../../components/misc";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { RealTimeAppointment } from "../../types";
import { useAuthStore } from "../../internals/auth/context";
import moment from "moment";
import { HomeNavKey } from ".";

export default function VisitHistory() {
	const navigation = useNavigation();

	return (
		<MainContainer
			title="Visit History"
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
					{/* <VisitHistorySection /> */}
				</View>
			</VStack>
		</MainContainer>
	);
}

const VisitHistorySection = () => {
	const navigation = useNavigation();
	const { profile } = useAuthStore((state) => ({ profile: state.profile }));
	const [appointments, setAppointments] = useState<RealTimeAppointment[]>([]);
	useEffect(() => {
		const subscriber = firestore()
			.collection("appointments")
			.where("pid", "==", profile?.id)
			// .where("status","!=","cancelled")
			.onSnapshot((documentSnapshot) => {
				const shots = [
					...documentSnapshot.docs.map((doc) => ({ ...doc.data() })),
				];
				setAppointments(shots as RealTimeAppointment[]);
			});

		// Stop listening for updates when no longer required
		return () => subscriber();
	}, [profile?.id]);

	const visitHistory = appointments?.filter((appointment) => {
		return (
			moment.unix(appointment.date.seconds).isBefore() &&
			appointment.status !== "cancelled"
		);
	});

	console.log("Appontments : ");
	console.log(JSON.stringify(appointments, null, 3));
	return (
		<VStack space={4} marginTop={8}>
			<VStack space={3}>
				{visitHistory.map((appointment) => {
					return (
						<View>
							<AppointmentAlert
								appointment={appointment}
							/>
						</View>
					);
				})}
			</VStack>
		</VStack>
	);
};
