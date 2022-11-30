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
	setLocation,
	setSpeciality,
	toggleSymptom,
} from "../../store/slices/appointment";
import { Text } from "../../components/text";
import { useAuth } from "../../contexts/AuthContext";
import { type } from "os";
import { specialities } from "../../data/specialities";
import MemoizedSelect from "../../components/MemoizedSelect";
import { languageAtom } from "../../store/atoms";

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

const regions: { name: string }[] = [
	"Residency Location",
	"Arusha",
	"Dar es Salaam",
	"Dodoma",
	"Geita",
	"Iringa",
	"Kagera",
	"Katavi",
	"Kigoma",
	"Kilimanjaro",
	"Lindi",
	"Manyara",
	"Mara",
	"Mbeya",
	"Morogoro",
	"Mtwara",
	"Mwanza",
	"Njombe",
	"Pemba North",
	"Pemba South",
	"Pwani",
	"Rukwa",
	"Ruvuma",
	"Shinyanga",
	"Simiyu",
	"Singida",
	"Tabora",
	"Tanga",
	"Zanzibar North",
	"Zanzibar South and Central",
	"Zanzibar West",
].map((region) => ({ name: region }));

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

	const [language] = useAtom(languageAtom);
	const languagePlaceholder = language === "en" ? "Location" : "Mahali";

	const { user, profile, loading } = useAuth();

	const { speciality, complaint } = useSelector(
		(state: RootState) => ({
			speciality: state.appointment.speciality,
			complaint: state.appointment.aboutVisit.complaint,
		}),
		shallowEqual
	);

	const [type, location] = useSelector(
		({ appointment }: RootState) => [
			appointment.type,
			appointment.location,
		],
		shallowEqual
	);


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
					<Stack space={2}>
						<Text tx="home.chooseLocation">Choose Location</Text>
						<MemoizedSelect

							// variant="rounded"
							rounded={4}
							selectedValue={location}
							minWidth={200}
							accessibilityLabel="Location"
							renderToHardwareTextureAndroid={true}
							placeholder={languagePlaceholder}
							options={regions.map((region) => ({
								label: region.name,
								value: region.name.toLowerCase(),
								key: region.name,
							}))}
							onValueChange={(itemValue) => {
								dispatch(setLocation(itemValue));
							}}
							_selectedItem={{
								bg: colors.primary,
								// justifyItems: "space-between",
								style: { alignContent: "space-between" },
								_text: { color: "#FFFFFF" },
								startIcon: <CheckIcon size={4} />,
							}}

						/>
					</Stack>

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
					rounded={4}
				>
					<Text color="white" tx="Select Facility">
						Select Facility
					</Text>
				</Button>
			</VStack>
		</MainContainer>
	);
}
