import {
	ArrowBackIcon,
	Box,
	Heading,
	HStack,
	Text,
	View,
	VStack,
} from "native-base";
import React from "react";
import MainContainer from "../../../components/containers/MainContainer";
import { StatusAppointmentAlert } from "../../../components/core/appointment";
import { Pressable } from "react-native";
import { IconContainer } from "../../../components/misc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_ROOT, getAppointmentDetails } from "../../../api";
import axios from "axios";
import { useQuery } from "react-query";
import { Spacer } from "../../../components/Spacer";

export default function AppointmentSpecifics() {
	const navigation = useNavigation();

	const route = useRoute();

	const { appointment } = route?.params;

	const { cid, pid } = appointment;
	const { status, data, error, isLoading } = useQuery(
		["appointmentDetails", cid, pid],
		() => getAppointmentDetails({ cid, pid })
	);

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

				<View bg="white" borderRadius={10} shadow={2} p={5}>
					<Text fontSize={"2xl"}>Symptoms</Text>
					<Spacer size={10} />
					<HStack space={4} flexWrap="wrap">
						{data?.aboutVisit.symptoms.map((symptom) => (
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
