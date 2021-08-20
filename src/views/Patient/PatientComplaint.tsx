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
import { colors } from "../../constants/colors";
import functions from "@react-native-firebase/functions";
import _ from "lodash";
import { TouchableOpacity, Alert, ToastAndroid, Pressable } from "react-native";
import { toggleStringFromList } from "../../utils";
import { StackNavigationProp } from "@react-navigation/stack";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import auth from "@react-native-firebase/auth";
import { atom, useAtom } from "jotai";
import axios from "axios";
import { API_ROOT } from "../../api";
import { HomeNavKey } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
	resetAppointmentState,
	setComplaint,
	toggleSymptom,
} from "../../store/slices/appointment";

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

// TODO: to find a batter place for these atoms
const isAppointmentInProgressAtom = atom<boolean>(false);
export const updateAppointmentInProgressAtom = atom(
	(get) => {
		return get(isAppointmentInProgressAtom);
	},
	(get, set, update: boolean) => {
		set(isAppointmentInProgressAtom, update);
	}
);

// TODO: breakdown the component to smaller as possible
// and create atom for the data needed for the invoice page

export function PatientComplaint() {
	const toast = useToast();
	const navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(false);

	const currentUser = auth().currentUser;

	const { profile, appointment } = useSelector(
		(state: RootState) => ({ profile: state.profile, appointment: state.appointment })
	);
	const dispatch = useDispatch();

	const submit = () => {
		console.log(currentUser, profile);
		if (currentUser !== null || !profile) {
			const fid = appointment.facility?.id;

			// FIXME: Move function to API file
			functions()
				.httpsCallable("makeAppointment")({
					// FIXME: Add a checker for fid being present
					fid,
					aboutVisit: appointment.aboutVisit,
					pid: profile?.profile?.id,
					timeRange: appointment.timeRange,
					type: appointment.type,
					utcDate: new Date(appointment.date).toUTCString(),
				})
				.then((res) => {
					ToastAndroid.show(
						"Success! Your appointment request has been made.",
						3000
					);
					dispatch(resetAppointmentState());
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: HomeNavKey.HomeScreen }]
						}));
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
					ToastAndroid.show("Error. Please try again.", 3000);
				});
		} else {
			navigation.navigate(HomeNavKey.Login);
		}
	};

	const confirmSubmit = () => {
		if (isLoading) {
			return ToastAndroid.show("Please wait while loading ...", 3000);
		}
		Alert.alert(
			"Submit Request",
			"Please confirm that you have entered correct information.",
			[
				{ text: "Cancel", onPress: () => {} },
				{
					text: "Confirm",
					onPress: (setIsLoading(true), submit),
				},
			]
		);
	};

	console.log("Root state ");
	console.log(JSON.stringify(appointment, null, 3));

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
							{/* FIXME: This smells bad. Needs refactor */}
							{_.chunk(keySymptoms, 2).map(
								([symptomA, symptomB], index) => (
									<HStack space={3}>
										<Box
											rounded="xl"
											borderColor="#ccc"
											bg={
												appointment.aboutVisit.symptoms.includes(
													symptomA
												)
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
													dispatch(
														toggleSymptom(symptomA)
													)
												}
											>
												<Text
													color={
														appointment.aboutVisit.symptoms.includes(
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
												appointment.aboutVisit.symptoms.includes(
													symptomB
												)
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
													dispatch(
														toggleSymptom(symptomB)
													)
												}
											>
												<Text
													color={
														appointment.aboutVisit.symptoms.includes(
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
							value={appointment.aboutVisit.complaint}
							autoCorrect={false}
							multiline
							textAlignVertical="top"
							borderColor="#FFF"
							placeholder="Describe how you are feeling ..."
							onChangeText={(complaint) => {
								dispatch(setComplaint(complaint));
							}}
						/>
					</VStack>
				</Box>

				<Button
					width="100%"
					bg={colors.primary}
					onPress={confirmSubmit}
					isLoading={isLoading}
					rounded={20}
				>
					{isLoading ? "Loading ..." : "Book Appointment"}
				</Button>
			</VStack>
		</MainContainer>
	);
}
