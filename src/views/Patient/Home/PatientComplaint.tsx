import React, { useState } from "react";
import {
	ArrowBackIcon,
	Box,
	Button,
	Heading,
	HStack,
	Input,
	ScrollView,
	Stack,
	Text,
	TextArea,
	View,
	VStack,
	useToast,
} from "native-base";
import {
	CommonActions,
	RouteProp,
	StackActions,
	useNavigation,
} from "@react-navigation/native";
import { colors } from "../../../constants/colors";
import _ from "lodash";
import { TouchableOpacity, Alert, ToastAndroid, Pressable } from "react-native";
import { toggleStringFromList } from "../../../utils";

import { HomeNavKey as MainNavKey } from "./_navigator";
import { StackNavigationProp } from "@react-navigation/stack";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { useAppointmentTempoStore } from "../../../internals/appointment/context";
import firestore from "@react-native-firebase/firestore";
import { useMutation } from "react-query";
import auth from "@react-native-firebase/auth";

import axios from "axios";
import { API_ROOT } from "../../../api";
import { useAuthStore } from "../../../internals/auth/context";
import { consultants } from "../../../data/consultants";

const keySymptoms = [
	"Fever",
	"Vomitting",
	"Chest Pain",
	"Cough",
	"Ear Pain",
	"Skin Rash",
];

// to be extended
interface NewAppointmentRequestBody {
	utcDate: string; // Date UTCString
	type: "online" | "offline";
	facilityId?: string;
	aboutVisit: {
		symptoms: string[];
		complaint: string;
	};
}

const saveAppointment = async ({
	data,
	cid,
	pid,
}: {
	data: NewAppointmentRequestBody;
	cid: string;
	pid: string;
}) => {
	console.log(`${API_ROOT}/v0/create/appointment/${cid}/${pid}`);
	try {
		const res = await axios.post(
			`${API_ROOT}/v0/create/appointment/${cid}/${pid}`,
			{
				...data,
			}
		);
	} catch (e) {
		console.log("Error : ", e.response);
		throw new Error("Error in saving appointment");
	}
};

export function PatientComplaint() {
	const toast = useToast()
	const navigation = useNavigation();
	const { profile } = useAuthStore((state) => ({ profile: state.profile }));

	const [symptoms, setSymptoms] = useState<Array<string>>([]);
	const [complaint, setComplaint] = useState("");

	const toggleKeySymptom = (symptom: string) => {
		const sy = toggleStringFromList(symptom, symptoms);
		setSymptoms(sy);
	};

	const onSubmit = () => {
		// adding this here to fake the flow on the patient appointments
		// addAppointment({
		// 	symptoms,
		// 	consultant,
		// 	complaint,
		// 	dateTime: appointment,
		// });

		// FIXME (ghmecc): This is platform-centric code, right? to mean
		//  that this code won't render on the web sio? any way to help with that?
		// ----------------------------------------
		Alert.alert(
			"Submit Request",
			"Please confirm that you have entered correct information.",
			[
				{ text: "Cancel", onPress: () => {} },
				{
					text: "Confirm",
					onPress: () => {},
				},
			]
		);
	};

	const { mutate: addAppointment, isLoading } = useMutation(saveAppointment, {
		onMutate: (variables) => {},
		onError: (error, variables, context) => {
			console.log("Something went wrong");
		},
		onSuccess: (data, variables, context) => {
			console.log("Data already saved ");
			console.log("Whats the response : ", data);
			toast.show({
				title: "Appointed created",
			});
			navigation.navigate(MainNavKey.HomeScreen);
			// Boom baby!
		},
	});

	return (
		<MainContainer
			title="About your Visit"
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
			<VStack alignItems="center" paddingX={10} space={10}>
				{/* Symptomps section */}
				<Box bg="white" shadow={2} rounded={10} width="100%">
					<Stack
						style={{
							paddingHorizontal: 20,
							paddingTop: 20,
							paddingBottom: 40,
						}}
						space={10}
					>
						<View>
							<Text fontSize={"3xl"}>Symptoms</Text>

							<Text>Check any symptoms you have.</Text>
						</View>

						<Stack space={2}>
							{_.chunk(keySymptoms, 2).map(
								([symptomA, symptomB], index) => (
									<HStack space={3}>
										<Box
											rounded="xl"
											borderColor="#ccc"
											bg={
												symptoms.includes(symptomA)
													? "#258FBE"
													: "#fff"
											}
											borderWidth={1}
											flex={1}
										>
											<TouchableOpacity
												style={{
													padding: 10,
													alignItems: "center",
													justifyContent: "center",
												}}
												onPress={() =>
													toggleKeySymptom(symptomA)
												}
											>
												<Text
													color={
														symptoms.includes(
															symptomA
														)
															? "#fff"
															: "#000"
													}
												>
													{symptomA}
												</Text>
											</TouchableOpacity>
										</Box>
										<Box
											rounded="xl"
											borderColor="#ccc"
											bg={
												symptoms.includes(symptomB)
													? "#258FBE"
													: "#fff"
											}
											borderWidth={1}
											flex={1}
										>
											<TouchableOpacity
												style={{
													padding: 10,
													alignItems: "center",
													justifyContent: "center",
												}}
												onPress={() =>
													toggleKeySymptom(symptomB)
												}
											>
												<Text
													color={
														symptoms.includes(
															symptomB
														)
															? "#fff"
															: "#000"
													}
												>
													{symptomB}
												</Text>
											</TouchableOpacity>
										</Box>
									</HStack>
								)
							)}
						</Stack>
					</Stack>
				</Box>

				<Box bg="white" shadow={2} rounded={10} width="100%">
					<VStack
						style={{
							paddingHorizontal: 20,
							paddingTop: 20,
							paddingBottom: 40,
						}}
						space={3}
					>
						<Text fontSize={"xl"}>
							What is your primary reason for seeing the doctor?
						</Text>

						<TextArea
							value={complaint}
							autoCorrect={false}
							multiline
							textAlignVertical="top"
							borderColor="#FFF"
							placeholder="Describe how you are feeling ..."
							onChangeText={(complaint) => {
								setComplaint(complaint);
							}}
						/>
					</VStack>
				</Box>
				<Button
					width="100%"
					bg={colors.primary}
					onPress={onSubmit}
					isLoading={isLoading}
					disabled={isLoading}
					rounded={20}
				>
					Book Appointment
				</Button>
			</VStack>
		</MainContainer>
	);
}
