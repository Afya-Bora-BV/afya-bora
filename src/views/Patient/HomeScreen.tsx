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
import UserIcon from "../../assets/icons/User";
import BellIcon from "../../assets/icons/Bell";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppointmentIllustration from "../../assets/illustrations/AppointmentIllustration";
import FacilityIllustration from "../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";

import HomeScreenIllustration from "../../assets/illustrations/HomeScreenIllustration";
import auth from "@react-native-firebase/auth";

import { Spacer } from "../../components/Spacer";
import { PrimaryButton } from "../../components/button";
import { atom, useAtom } from "jotai";
import AppointmentCustomizer from "../../components/appointment-customizer";
import { HomeNavKey } from ".";
import { updateAppointmentInProgressAtom } from "./PatientComplaint";
import { getFacilities } from "../../api";
import {
	Alert,
	PermissionsAndroid,
	Platform,
	ToastAndroid,
	TouchableOpacity,
} from "react-native";
import _ from "lodash";
import { usePatientAppointments } from "../../hooks/usePatientAppointments";
import moment from "moment";
import { AppointmentAlert } from "../../components/core/appointment";
import Geolocation from "react-native-geolocation-service";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AccountDetails = () => {
	const navigation = useNavigation();
	const user = auth().currentUser;
	const handlPress = () => {
		if (user) {
			// navigate to seeing details
			navigation.navigate(HomeNavKey.Profile);
		} else {
			navigation.navigate(HomeNavKey.Login);
		}
	};

	return (
		<Stack space={2}>
			<Heading fontSize="xl">Your AfyaBora Account</Heading>
			<Pressable onPress={handlPress}>
				{/* Find mean to set relative width: 160 -> 33%?? */}
				<Center height={100} bgColor="#FFF" rounded="xl" shadow={4}>
					<AppointmentIllustration size={70} />
					<Text
						fontWeight="800"
						textAlign="center"
						// wordBreak="break-word"
						// overflowWrap="break-word"
					>
						{user
							? "View Profile and Visits"
							: "Sign in / Create Account"}
					</Text>
				</Center>
			</Pressable>
		</Stack>
	);
};

// FIXME: Update user information with information from the profile store.
const ProfileInformation = () => {
	const user = auth().currentUser;
	const currentProfile = useSelector(({ profile }: RootState) => profile);
	console.log("Profile : ", currentProfile.profile);
	if (user) {
		return (
			<VStack flex={1}>
				<Text>{moment().format("DD MMMM YYYY")}</Text>
				<Heading fontSize="3xl">
					Hi, {currentProfile?.profile?.name}
				</Heading>
			</VStack>
		);
	}
	return (
		<HStack flexWrap="wrap">
			<VStack flex={1} justifyContent="center">
				<Heading fontSize="3xl">How can we help you today?</Heading>
			</VStack>

			<HomeScreenIllustration flex={3} size={200} />
		</HStack>
	);
};

const LocationHelper = () => {
	const navigation = useNavigation();
	const [location, setLocation] = useState(null);
	const [isLocationLoading, setIsLocationLoading] = useState(false);

	const hasLocationPermission = async () => {
		if (Platform.OS === "android" && Platform.Version < 23) {
			return true;
		}

		const hasPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);

		if (hasPermission) {
			return true;
		}

		const status = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);

		if (status === PermissionsAndroid.RESULTS.GRANTED) {
			return true;
		}

		if (status === PermissionsAndroid.RESULTS.DENIED) {
			ToastAndroid.show(
				"Location permission denied by user.",
				ToastAndroid.LONG
			);
		} else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			ToastAndroid.show(
				"Location permission revoked by user.",
				ToastAndroid.LONG
			);
		}

		return false;
	};

	const getLocation = async () => {
		setIsLocationLoading(true);
		const hasPermission = await hasLocationPermission();

		if (!hasPermission) {
			setIsLocationLoading(false);
			return;
		}

		Geolocation.getCurrentPosition(
			(position) => {
				setLocation(position);
				console.log(position);
				ToastAndroid.show("Location acquired : ", ToastAndroid.SHORT);
				setIsLocationLoading(false);
			},
			(error) => {
				Alert.alert(`Code ${error.code}`, error.message);
				setLocation(null);
				console.log(error);
				setIsLocationLoading(false);
			},
			{
				accuracy: {
					android: "high",
					ios: "best",
				},
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 10000,
				distanceFilter: 0,
				forceRequestLocation: true,
				forceLocationManager: false,
				showLocationDialog: true,
			}
		);
	};

	React.useEffect(() => {
		getLocation();
	}, []);
	return (
		<Stack space={2}>
			<Heading fontSize="xl">{"Need quick medical attention?"}</Heading>
			{isLocationLoading && !location && (
				<Text>Acquiring user location</Text>
			)}
			{location && (
				<Pressable
					onPress={() => {
						navigation.navigate(HomeNavKey.FacilityMap, {
							location,
						});
					}}
				>
					{/* Find mean to set relative width: 160 -> 33%?? */}
					<Center
						// height={100}
						bgColor="#FFF"
						rounded="xl"
						shadow={4}
						padding={6}
					>
						<FacilityIllustration size={70} />
						<Text
							fontWeight="800"
							textAlign="center"
							// wordBreak="break-word"
							// overflowWrap="break-word"
						>
							Map of Facilities near you
						</Text>
					</Center>
				</Pressable>
			)}
			{!location && !isLocationLoading && (
				<Text>here was an error in Acquiring Your Location</Text>
			)}
		</Stack>
	);
};
export default function Home() {
	const navigation = useNavigation();
	const [location, setLocation] = useState(null);

	const user = auth().currentUser;

	const { appointments } = usePatientAppointments(user?.uid);

	const appointment = appointments[0];

	const openAppointment = (appointment: any) => {
		navigation.navigate(HomeNavKey.AppointmentInfo, { appointment });
	};

	return (
		<MainContainer
			leftSection={() => (
				<Pressable
					onPress={() => {
						navigation.navigate(HomeNavKey.Profile);
					}}
				>
					<IconContainer>
						<UserIcon size={6} color="#561BB3" />
					</IconContainer>
				</Pressable>
			)}
			rightSection={() => (
				<HStack space={4}>
					<Pressable
						onPress={() => {
							navigation.navigate(HomeNavKey.Notification);
						}}
					>
						<IconContainer>
							<BellIcon size={6} color="#561BB3" />
						</IconContainer>
					</Pressable>
				</HStack>
			)}
		>
			<ScrollView width="100%" testID="Home" p={5} pb={10}>
				<ProfileInformation />
				<Spacer size={30} />

				{appointment && (
					<Stack px={1}>
						<View marginBottom={6}>
							<Text
								fontSize="lg"
								marginBottom={1}
								fontWeight="bold"
							>
								Upcoming Appointments
							</Text>

							{/* FIXME: Extract out to new component */}
							<AppointmentAlert appointment={appointment} />
							<TouchableOpacity
								style={{ marginTop: 8 }}
								onPress={() => {
									navigation.navigate(
										HomeNavKey.UpcomingAppointments
									);
								}}
							>
								<Text textAlign="right" my={2} color="gray.500">
									See All Appointments
								</Text>
							</TouchableOpacity>
						</View>
					</Stack>
				)}
				<ScheduleAppointmentSection />
				<Spacer size={30} />

				<VStack
					space={4}
					marginTop={3}
					justifyContent="space-between"
					px={1}
					py={2}
				>
					<LocationHelper />
					<AccountDetails />
				</VStack>
			</ScrollView>
		</MainContainer>
	);
}

// TOO: move this component and all its atom to component folder
export const ScheduleAppointmentSection = () => {
	const { navigate } = useNavigation();

	const handleOnPress = () => {
		// just logging the data here which can be accessed in other components as well
		navigate(HomeNavKey.ConsultantList);
		// navigate on click
	};

	return (
		<>
			<Text fontSize="lg" marginBottom={1} fontWeight="bold">
				Schedule an appointment
			</Text>
			<Box bgColor="#FFF" rounded="xl" shadow={4} p={3}>
				<Stack space={5} py={2}>
					<AppointmentCustomizer />
					<PrimaryButton onPress={handleOnPress}>
						Schedule
					</PrimaryButton>
				</Stack>
			</Box>
		</>
	);
};
