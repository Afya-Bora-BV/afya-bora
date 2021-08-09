import React, { useCallback, useEffect, useState } from "react";
import {
	Box,
	Center,
	HStack,
	VStack,
	Text,
	View,
	Heading,
	Pressable,
	ScrollView,
	Square,
	useToast,
	Select,
	Stack,
	CheckIcon,
} from "native-base";
import UserIcon from "../../../assets/icons/User";
import BellIcon from "../../../assets/icons/Bell";
import AppointmentIllustration from "../../../assets/illustrations/AppointmentIllustration";
import FacilityIllustration from "../../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import { HomeNavKey } from "./_navigator";
import { NavKey } from "../../_Main/_navigator";
import { colors } from "../../../constants/colors";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";

import HomeScreenIllustration from "../../../assets/illustrations/HomeScreenIllustration";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/Spacer";
import { PrimaryButton } from "../../../components/button";
import { atom, useAtom } from "jotai";

const helpOptions = [
	{
		illustration: FacilityIllustration,
		title: "Map of Facilities near you",
		onNavigate: (navigation: any) => {
			navigation.navigate(HomeNavKey.MapFaciltyViewScreen);
		},
	},
	{
		illustration: AppointmentIllustration,
		title: "Sign in / Create Account",
		onNavigate: (navigation: any) => {
			navigation.navigate(NavKey.LoginScreen);
		},
	},
];

export default function Home() {
	const navigation = useNavigation();
	// const { profile } = useAuthStore((state) => ({ profile: state.profile }));

	console.log("User profile");
	// console.log(JSON.stringify(profile, null, 2));
	return (
		<MainContainer
			leftSection={() => (
				<IconContainer>
					<UserIcon size={6} color="#561BB3" />
				</IconContainer>
			)}
			rightSection={() => (
				<HStack space={4}>
					<Pressable
						onPress={() =>
							navigation.navigate(HomeNavKey.NotificationScreen)
						}
					>
						<IconContainer>
							<BellIcon size={6} color="#561BB3" />
						</IconContainer>
					</Pressable>
				</HStack>
			)}
		>
			<ScrollView width="100%" testID="Home" p={5} pb={10}>
				<HStack flexWrap="wrap">
					<VStack flex={1} justifyContent="center">
						<Heading fontSize="3xl">
							How can we help you today?
						</Heading>
					</VStack>

					<HomeScreenIllustration flex={3} size={200} />
				</HStack>

				<Spacer size={30} />

				<Stack px={1}>
					<ScheduleAppointmentSection />
				</Stack>

				<Spacer size={30} />

				<VStack
					space={4}
					marginTop={3}
					justifyContent="space-between"
					px={1}
					py={2}
				>
					{helpOptions.map(
						(
							{ illustration: Illustration, onNavigate, title },
							ix
						) => (
							<Pressable
								key={`helpOption-${ix}`}
								onPress={() => onNavigate(navigation)}
							>
								{/* Find mean to set relative width: 160 -> 33%?? */}
								<Center
									height={100}
									bgColor="#FFF"
									rounded="xl"
									shadow={4}
								>
									<Illustration size={70} />
									<Text
										fontWeight="800"
										textAlign="center"
										// wordBreak="break-word"
										// overflowWrap="break-word"
									>
										{title}
									</Text>
								</Center>
							</Pressable>
						)
					)}
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}

interface CompleteProfileInputs {
	location: string;
	speciality: string;
}

const specialities: { name: string }[] = [
	"Specialities",
	"Dentist",
	"Dermatologist",
].map((speciality) => ({ name: speciality }));

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

// these attoms to be moved since the state might be needed somewhere
const appointmentTypeAtom = atom<"offline" | "online" | "">("");
const locationAtom = atom<string>("");
const specialityAtom = atom<string>("");
const scheduleAtom = atom<string>("");

const setAppointmentTypeAtom = atom(
	(get) => {
		return get(appointmentTypeAtom);
	},
	(get, set, update: "offline" | "online" ) => {
		// you can do more logic here for the state
		set(appointmentTypeAtom, update);
	}
);

const setLocationAtom = atom(
	(get) => {
		return get(locationAtom);
	},
	(get, set, update: string) => {
		set(locationAtom, update);
	}
);

const setSpecialityAtom = atom(
	(get) => {
		return get(specialityAtom);
	},
	(get, set, update: string) => {
		set(specialityAtom, update);
	}
);

const completeScheduleAtom = atom(
	(get) => {
		// you can do more logic to check
		return {
			type: get(appointmentTypeAtom),
			location: get(locationAtom),
			speciality: get(specialityAtom),
		};
	},
	(get, set) => {}
);
type AppointmentType = { title: string; value: "online" | "offline" };
const appointmentTypes: AppointmentType[] = [
	{
		title: "At Facility",
		value: "offline",
	},
	{
		title: "Online (Virtual)",
		value: "online",
	},
];

const AppointmentTypeButton: React.FC<AppointmentType> = ({ title, value }) => {
	const [type, setType] = useAtom(setAppointmentTypeAtom);
	return (
		<TouchableOpacity
			onPress={() => {
				setType(value);
			}}
			style={{
				backgroundColor: type === value ? colors.primary : "white",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				borderRadius: 10,
				borderColor: type === value ? colors.primary : "grey",
				borderWidth: 1,
				paddingVertical: 16,
			}}
		>
			<Text
				style={{
					color: type === value ? "white" : "grey",
				}}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const AppointmentLocation = () => {
	const [location, setLocation] = useAtom(setLocationAtom);
	return (
		<Select
			variant="rounded"
			selectedValue={location}
			minWidth={200}
			accessibilityLabel="Location"
			placeholder="Location"
			onValueChange={(itemValue) => {
				setLocation(itemValue);
			}}
			_selectedItem={{
				bg: "cyan.600",
				endIcon: <CheckIcon size={4} />,
			}}
		>
			{regions.map((region) => (
				<Select.Item label={region.name} value={region.name} />
			))}
		</Select>
	);
};

const SelectSpeciality = () => {
	const [speciality, setSpeciality] = useAtom(setSpecialityAtom);
	return (
		<Select
			variant="rounded"
			selectedValue={speciality}
			minWidth={200}
			accessibilityLabel="Speciality"
			placeholder="Speciality"
			onValueChange={(itemValue) => setSpeciality(itemValue)}
			_selectedItem={{
				bg: "cyan.600",
				endIcon: <CheckIcon size={4} />,
			}}
		>
			{specialities.map((speciality) => (
				<Select.Item label={speciality.name} value={speciality.name} />
			))}
		</Select>
	);
};

const ScheduleButton = () => {
	const [schedule] = useAtom(completeScheduleAtom);
	const { navigate } = useNavigation();
	const handleOnPress = () => {
		// just logging the data here which can be accessed in other components as well
		console.log("Currently schedule value", schedule);
		navigate(HomeNavKey.ConsultantList);
		// navigate on click
	};

	// TODO: fixing type issue here
	return <PrimaryButton onPress={handleOnPress}>Schedule</PrimaryButton>;
};

// TOO: move this component and all its atom to component folder
export const ScheduleAppointmentSection = () => {
	return (
		<Box bgColor="#FFF" rounded="xl" shadow={4} p={3}>
			<Stack space={5} py={2}>
				<Stack>
					<Text>Choose Type of Appointment</Text>

					<Spacer size={10} />

					<HStack space={2}>
						{appointmentTypes.map((appointmentType) => (
							<AppointmentTypeButton
								title={appointmentType.title}
								value={appointmentType.value}
							/>
						))}
					</HStack>
				</Stack>

				<Stack>
					<Text>Choose Location</Text>
					<Spacer size={10} />
					<AppointmentLocation />
				</Stack>

				<Stack>
					<Text>Choose Speciality</Text>
					<Spacer size={10} />
					<SelectSpeciality />
				</Stack>
				<ScheduleButton />
			</Stack>
		</Box>
	);
};
