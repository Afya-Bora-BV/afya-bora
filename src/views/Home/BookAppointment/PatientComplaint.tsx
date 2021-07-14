import React, { useState } from "react";
import {
	Box,
	Button,
	Heading,
	HStack,
	Input,
	ScrollView,
	Stack,
	Text,
	TextArea,
} from "native-base";
import { HeaderwithBack } from "../../../components/header";
import {
	CommonActions,
	RouteProp,
	StackActions,
	useNavigation,
} from "@react-navigation/native";
// import { Symptom } from "../../../components/bars";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../contants/colors";
import _ from "lodash";
import { TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { toggleStringFromList } from "../../../utils";

import { HomeNavKey as MainNavKey } from "../";
import { StackNavigationProp } from "@react-navigation/stack";
import { BookAppointmentStackParamList } from ".";
import { useAppointmentTempoStore } from "../../../internals/appointment/context";

import { useMutation } from 'react-query'
import { TabNavKey } from "../../_Authenticated";

type PatientComplaintScreenRouteProp = RouteProp<
	BookAppointmentStackParamList,
	"PatientComplaint"
>;
type PatientComplaintNavigationProp = StackNavigationProp<
	BookAppointmentStackParamList,
	"PatientComplaint"
>;

type PatientComplaintProps = {
	route: PatientComplaintScreenRouteProp;
	navigation: PatientComplaintNavigationProp;
};

const keySymptoms = [
	"Fever",
	"Vomitting",
	"Chest Pain",
	"Cough",
	"Ear Pain",
	"Skin Rash",
];

export function PatientComplaint({ route }: PatientComplaintProps) {
	const setAppointment = useAppointmentTempoStore(state => state.setAppointment)

	const { mutate: addAppointment, isLoading } = useMutation(setAppointment, {
		onMutate: variables => {
		},
		onError: (error, variables, context) => {
			console.log("Something went wrong")
		},
		onSuccess: (data, variables, context) => {
			console.log("Data already saved ")
			navigation.navigate(TabNavKey.HomeView);
			// Boom baby!
		},

	})
	const navigation = useNavigation();

	const [symptoms, setSymptoms] = useState<Array<string>>([]);

	const [complaint, setComplaint] = useState("n/a");

	const toggleKeySymptom = (symptom: string) => {
		const sy = toggleStringFromList(symptom, symptoms);
		setSymptoms(sy);
	};

	const consultant = route.params.consultant;

	const appointment = route.params.appointment;

	const onSubmit = () => {
		// adding this here to fake the flow on the patient appointments
		// FIXME (ghmecc): This is platform-centric code, right? to mean
		//  that this code won't render on the web sio? any way to help with that?
		// ----------------------------------------
		Alert.alert(
			"Submit Request",
			"Please confirm that you have entered correct information.",
			[
				{ text: "Cancel", onPress: () => { } },
				{
					text: "Confirm",
					onPress: () => {
						// TODO: arguments to the add appointment function
						addAppointment({
							symptoms,
							consultant,
							complaint,
							dateTime: appointment,
						})
					},
				},
			]
		);
	};

	return (
		<ScrollView>
			<HeaderwithBack
				text="About Your Visit"
				onBackPress={navigation.goBack}
			/>

			<Spacer size={30} />

			<Stack alignItems="center">
				<Box bg="white" shadow={2} rounded={10} width="90%">
					<Stack
						style={{
							paddingHorizontal: 20,
							paddingTop: 20,
							paddingBottom: 40,
						}}
					>
						<Text fontSize={"3xl"}>Symptoms</Text>

						<Text>Check any symptoms you have.</Text>

						<Spacer size={30} />

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

				<Spacer size={30} />

				<Box bg="white" shadow={2} rounded={10} width="90%">
					<Stack
						style={{
							paddingHorizontal: 20,
							paddingTop: 20,
							paddingBottom: 40,
						}}
					>
						<Text fontSize={"xl"}>
							What is your primary reason for seeing the doctor?
						</Text>

						<Box mt={2}>
							<TextArea
								value={complaint}
								autoCorrect={false}
								placeholder="Describe how you are feeling ..."
								onChangeText={(complaint) => {
									setComplaint(complaint);
								}}
							/>
						</Box>
					</Stack>
				</Box>
			</Stack>
			<Button my={6} bg={colors.primary} onPress={onSubmit} isLoading={isLoading} disabled={isLoading} rounded={20}>
				Book Appointment
			</Button>
			<Spacer size={10} />
		</ScrollView>
	);
}
