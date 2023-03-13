import { ArrowBackIcon, View, VStack } from "native-base";
import { Text } from "react-native-svg";
import React, { useEffect, useState } from "react";
import MainContainer from "../../components/containers/MainContainer";
import { AppointmentAlert } from "../../components/core/appointment";
import { Pressable } from "react-native";
import { IconContainer } from "../../components/misc";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { RealTimeAppointment } from "../../types";
import moment from "moment";
import { HomeNavKey } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAuth } from "../../contexts/AuthContext";
import { usePatientAppointments } from "../../hooks/usePatientAppointments";
import { LoadingFullScreen } from "../../components/LoadingFullScreen";

export default function VisitHistory() {
	const navigation = useNavigation();

	return (
		<MainContainer
			title="Appointment History"
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
					<VisitHistorySection />
				</View>
			</VStack>
		</MainContainer>
	);
}

const VisitHistorySection = () => {
	const navigation = useNavigation();
	const { profile } = useAuth();
	const { generalAppointments, loading } = usePatientAppointments(profile?.id);

	const visitHistory = generalAppointments?.filter((appointment) => {
		return (
			moment(appointment.date.toDate()).isBefore() &&
			appointment.status !== "cancelled"
		);
	});

	console.log("Appontments : ");
	console.log(JSON.stringify(generalAppointments, null, 3));

	if (loading) {
		return <LoadingFullScreen />;
	}

	return (
		<VStack space={4} marginTop={8}>
			<VStack space={3}>
				{generalAppointments.map((appointment) => {
					return (
						<View key={appointment?.id}>
							<AppointmentAlert appointment={appointment} />
						</View>
					);
				})}
			</VStack>
		</VStack>
	);
};
