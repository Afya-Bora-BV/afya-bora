import React, { useState } from "react";
import {
	ArrowBackIcon,
	Box,
	Button,
	HStack,
	Stack,
	TextArea,
	View,
	VStack,
	useToast,
	SimpleGrid,
} from "native-base";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import functions from "@react-native-firebase/functions";
import _ from "lodash";
import { TouchableOpacity, Alert, ToastAndroid, Pressable } from "react-native";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import { atom, useAtom } from "jotai";
import { HomeNavKey } from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
	resetAppointmentState,
	setComplaint,
	setSpeciality,
	toggleSymptom,
} from "../../store/slices/appointment";
import { Text } from "../../components/text";
import { useAuth } from "../../contexts/AuthContext";
import { type } from "os";

const keySymptoms = [
	"Fever",
	"Vomitting",
	"Chest Pain",
	"Cough",
	"Ear Pain",
	"Skin Rash",
];

// TODO: these should come from facility settings
const specializations = [
	"General Doctor",
	"Maternity",
	"Gynaecologist",
	"Dermatologist",
	"Endocrinology",
	"Family Medicine",
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

	const { appointment } = useSelector((state: RootState) => ({
		appointment: state.appointment,
	}));

	const { currentUser, profile, loadingProfile } = useAuth();

	const dispatch = useDispatch();

	const submit = () => {
		console.log(currentUser, profile);
		if (profile && !loadingProfile) {
			navigation.navigate(HomeNavKey.ConfirmAppointment);
		} else if (!profile && !currentUser) {
			ToastAndroid.show(
				"Please create an account first before proceeding.",
				ToastAndroid.SHORT
			);
			return navigation.navigate(HomeNavKey.Login, {
				completingAppointment: true,
			});
		} else {
			ToastAndroid.show(
				"Please create your profile first first before proceeding.",
				ToastAndroid.SHORT
			);
			navigation.navigate(HomeNavKey.CreateProfile, {
				completingAppointment: true,
			});
		}
	};

	const confirmSubmit = () => {
		Alert.alert(
			"Confirm Request",
			"Please confirm that you have entered correct information.",
			[
				{ text: "Cancel", onPress: () => {} },
				{
					text: "Confirm",
					onPress: submit,
				},
			]
		);
	};

	console.log("Root state ");
	console.log(JSON.stringify(appointment, null, 3));

	return (
		<MainContainer
			title="aboutVisit.aboutYourVisit"
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
			<VStack alignItems="center" paddingX={4} space={10}>
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
							<Text
								fontSize={"3xl"}
								tx="aboutVisit.doctorSpecialization"
							>
								Doctor Specialization
							</Text>

							<Text tx="aboutVisit.doctorSpecializationDescription">
								Please select a specialist.
							</Text>
						</View>

						<Stack space={2}>
							{/* FIXME: This smells bad. Needs refactor */}
							<SimpleGrid columns={2} space={3}>
								{specializations.map((specilization, index) => (
									<Box
										rounded="xl"
										borderColor="#ccc"
										bg={
											appointment.speciality ===
											specilization
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
													setSpeciality(specilization)
												)
											}
										>
											<Text
												color={
													appointment.speciality ===
													specilization
														? "#fff"
														: "#000"
												}
											>
												{specilization}
											</Text>
										</TouchableOpacity>
									</Box>
								))}
							</SimpleGrid>
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
						<Text
							fontSize={"xl"}
							tx="aboutVisit.primaryReasonToSeeDoctor"
						>
							What is your primary reason for seeing the doctor?
						</Text>

						<TextArea
							value={appointment.aboutVisit.complaint}
							autoCorrect={false}
							multiline
							textAlignVertical="top"
							borderColor="#ccc"
							placeholder="..."
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
					rounded={20}
				>
					<Text color="white" tx="aboutVisit.bookAppointment">
						Book appointment
					</Text>
				</Button>
			</VStack>
		</MainContainer>
	);
}
