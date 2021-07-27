import {
	ArrowBackIcon,
	View,
	VStack,
	Button,
	Text,
	Box,
	Heading,
} from "native-base";
import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import { StatusAppointmentAlert, UpcomingAppointmentAlert } from "../../../components/core/appointment";
import { Pressable } from "react-native";
import { IconContainer } from "../../../components/misc";
import { useNavigation, useRoute } from "@react-navigation/native";
import UpcomingAppointmentIllustration from "../../../assets/illustrations/UpcomingAppointmentIllustration";
import { typography } from "styled-system";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../constants/colors";
import { AppointmentAlert } from "../../../components/core/appointment";
import { useAuthStore } from "../../../internals/auth/context";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { RealTimeAppointment } from "../../../types";
import { HomeNavKey } from "../Home/_navigator";

export default function UpcomingAppointments() {
	const navigation = useNavigation();

	return (
		<MainContainer
			title="Upcoming Appointments"
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
				
					<UpcomingAppointmentsSection />
				</View>
			</VStack>
		</MainContainer>
	);
}

export function NoAppointment() {
	return (
		<View bg="white" shadow={2} rounded={10} width="100%" padding={3}>
			<UpcomingAppointmentIllustration size={300} />
			<VStack
				bg="white"
				shadow={2}
				borderRadius={10}
				style={{ alignItems: "center" }}
			>
				<Text bold textAlign="center">
					You do not have an appointment!
				</Text>
				<Spacer size={10} />
				<Text textAlign="center">
					Book a health care service right away for you and your
					family.
				</Text>
				<Spacer size={40} />
				<Box
					position="absolute"
					bottom={-20}
					left={0}
					right={0}
					width="100%"
					paddingX={10}
				>
					<Button
						style={{ backgroundColor: colors.primary }}
						borderLeftRadius={10}
						variant="solid"
					>
						Make an appointment
					</Button>
				</Box>
			</VStack>
		</View>
	);
}

const UpcomingAppointmentsSection = () => {
	const navigation = useNavigation();
	const uid = auth().currentUser?.uid;
	const [appointments, setAppointments] = useState<RealTimeAppointment[]>([]);
	useEffect(() => {
		const subscriber = firestore()
			.collection("appointments")
			.where("pid", "==", uid)
			.onSnapshot((documentSnapshot) => {
				const shots = [
					...documentSnapshot.docs.map((doc) => ({ ...doc.data() })),
				];
				setAppointments(shots as RealTimeAppointment[]);
			});

		// Stop listening for updates when no longer required
		return () => subscriber();
	}, [uid]);

	console.log("Appontments : ");
	console.log(JSON.stringify(appointments, null, 3));
	return (
		<VStack space={4} marginTop={8}>
			<VStack space={3}>
			{appointments.length===0 && <NoAppointment/>}

				{appointments.map((appointment) => {
					return (
						<UpcomingAppointmentAlert
							appointment={appointment}
							onPress={() => {
								navigation.navigate(HomeNavKey.AppointmentInfoScreen, {
									appointment: appointment
								})
							}}
						/>
					);
				})}
			</VStack>
		</VStack>
	);
};
