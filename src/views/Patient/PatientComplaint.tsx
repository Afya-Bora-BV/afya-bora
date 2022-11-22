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
	Select,
	CheckIcon,
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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { specialities } from "../../data/specialities";

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

	const { speciality, complaint } = useSelector(
		(state: RootState) => ({
			speciality: state.appointment.speciality,
			complaint: state.appointment.aboutVisit.complaint,
		}),
		shallowEqual
	);

	const { user, profile, loading } = useAuth();

	const dispatch = useDispatch();

	const submit = () => {
		if (profile && !loading) {
			navigation.navigate(HomeNavKey.ConfirmAppointment);
		} else if (!profile && !user) {
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

	const handleOnPress = () => {
		// just logging the data here which can be accessed in other components as well
		navigation.navigate(HomeNavKey.ConsultantList);
	};

	const confirmSubmit = () => {
		Alert.alert(
			"Confirm Request",
			"Please confirm that you have entered correct information.",
			[
				{ text: "Cancel", onPress: () => { } },
				{
					text: "Confirm",
					onPress: submit,
				},
			]
		);
	};

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
			<VStack alignItems="center" paddingX={4} space={4} mt={4}>
				{/* Symptomps section */}
				<Box bg="white" shadow={2} rounded={10} width="100%">
					<Stack
						style={{
							paddingHorizontal: 20,
							paddingTop: 20,
							paddingBottom: 40,
						}}
						space={4}
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
							{/* <SimpleGrid columns={2} space={3}> */}
							{/* {specialities.map((specilization, index) => (
									<Box
										rounded="xl"
										borderColor="#ccc"
										bg={
											speciality === specilization.value
												? colors.primary
												: "#fff"
										}
										borderWidth={1}
										flex={1}
										key={specilization.label}
									>
										<TouchableOpacity
											style={{
												padding: 10,
												alignItems: "center",
												justifyContent: "center",
											}}
											onPress={() =>
												dispatch(
													setSpeciality(specilization.value)
												)
											}
										>
											<Text
												color={
													speciality === specilization.value
														? "#fff"
														: "#000"
												}
											>
												{specilization.label}
											</Text>
										</TouchableOpacity>
									</Box>
								))} */}
							{/* </SimpleGrid> */}
							<Select selectedValue={speciality} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
								// bg: "teal.600",
								backgroundColor: colors.primary,
								endIcon: <CheckIcon size="5" color={"#FFFFFF"} />,
								color: "red.400",
								_text: { color: "#FFFFFF" }
							}} mt={1} onValueChange={itemValue => {
								dispatch(
									setSpeciality(itemValue)
								)
							}}>
								{specialities.map(speciality => (
									<Select.Item key={speciality.value} label={speciality.label} value={speciality.value} />
								))}
							</Select>
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
							value={complaint}
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
					onPress={handleOnPress}
					rounded={20}
				>
					<Text color="white" tx="Select Facility">
						Select Facility
					</Text>
				</Button>
			</VStack>
		</MainContainer>
	);
}
