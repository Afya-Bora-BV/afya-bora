import React, { useEffect, useState } from "react";
import {
	Box,
	Center,
	HStack,
	VStack,
	View,
	Heading,
	Pressable,
	ScrollView,
	Stack,
	Spinner,
} from "native-base";
import { Text } from "../../components/text";
import UserIcon from "../../assets/icons/User";
import BellIcon from "../../assets/icons/Bell";
import AppointmentIllustration from "../../assets/illustrations/AppointmentIllustration";
import FacilityIllustration from "../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";

import HomeScreenIllustration from "../../assets/illustrations/HomeScreenIllustration";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { Spacer } from "../../components/Spacer";
import { PrimaryButton } from "../../components/button";
import AppointmentCustomizer from "../../components/appointment-customizer";
import { DoctorRoutes, HomeNavKey } from ".";
import {
	Alert,
	PermissionsAndroid,
	Platform,
	ToastAndroid,
	TouchableOpacity,
} from "react-native";
import { usePatientAppointments } from "../../hooks/usePatientAppointments";
import moment from "moment";
import { AppointmentAlert } from "../../components/core/appointment";
import Geolocation from "react-native-geolocation-service";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Profile } from "../../store/slices/profile";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LoadingFullScreen } from "../../components/LoadingFullScreen";
import { userHasProfile } from "../../api";
import { RootState } from "../../store";

type AccountDetailsProps = {
	profile: Profile | null;
	handleAccountPress: () => void;
};

const AccountDetails: React.FC<AccountDetailsProps> = ({
	handleAccountPress,
	profile,
}) => {
	if (profile) {
		return (
			<Stack space={2}>
				<Text
					fontSize="xl"
					fontWeight="bold"
					tx="home.yourAfyaBoraAccout"
				>
					Your Afya Bora Account
				</Text>
				<Pressable onPress={handleAccountPress}>
					<Center bgColor="#FFF" py={6} rounded="xl" shadow={4}>
						<AppointmentIllustration size={70} />
						<Text
							fontWeight="800"
							textAlign="center"
							tx="home.profileAndVisits"
						>
							Profile and Visits
						</Text>
					</Center>
				</Pressable>
			</Stack>
		);
	}

	return (
		<Stack space={2}>
			<Text fontSize="xl" fontWeight="bold" tx="home.yourAfyaBoraAccout">
				Your Afya Bora Account
			</Text>
			<Pressable onPress={handleAccountPress}>
				{/* Find mean to set relative width: 160 -> 33%?? */}
				<Center bgColor="#FFF" py={6} rounded="xl" shadow={4}>
					<AppointmentIllustration size={70} />
					<Text
						fontWeight="800"
						textAlign="center"
						tx="home.signInCreateAccount"
					>
						Sign in / Create Account
					</Text>
				</Center>
			</Pressable>
		</Stack>
	);
};

type ProfileInformationProps = {
	profile: Profile | null;
	user: FirebaseAuthTypes.User | null;
};

// FIXME: Update user information with information from the profile store.
const ProfileInformation: React.FC<ProfileInformationProps> = ({
	profile,
	user,
}) => {
	const navigation = useNavigation()
	const [loading, setLoading] = React.useState<boolean>(false)

	React.useEffect(() => {
		const checkUser = async () => {
			if (user && !profile) {
				setLoading(false)
				return navigation.navigate(HomeNavKey.CreateProfile);
			} else {
				setLoading(false)
			}
		}

		checkUser()
	}, [user, profile])


	if (loading) {
		<VStack flex={1} justifyContent="center" alignItems={"center"}>
			<Spinner size="lg" />
		</VStack>
	}

	if (user) {
		return (
			<VStack flex={1}>
				<Text>{moment().format("DD MMMM YYYY")}</Text>
				<Heading fontSize="3xl">
					<Text fontSize="3xl" tx="common.hi">
						Hi
					</Text>
					, {profile?.name}
				</Heading>
			</VStack>
		);
	}
	return (
		<HStack flexWrap="wrap">
			<VStack flex={1} justifyContent="center">
				<Text
					fontSize="3xl"
					fontWeight="bold"
					tx="home.howCanWeHelpYouToday"
				>
					How can we help you today?
				</Text>
			</VStack>

			<HomeScreenIllustration flex={3} size={200} />
		</HStack>
	);
};

const LocationHelper = () => {
	const navigation = useNavigation();
	const [location, setLocation] = useState(null);
	const [isLocationLoading, setIsLocationLoading] = useState(false);

	const [speciality] = useSelector(
		({ appointment }: RootState) => [
			appointment.speciality
		],
		shallowEqual
	);

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
				// console.log(position);
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

	const handleNearByFacilityPress = () => {
		if (!Boolean(speciality)) {
			ToastAndroid.show("Please select doctors speciality", 3000);
			return
		}
		navigation.navigate(HomeNavKey.FacilityMap, {
			location,
		});
	}

	return (
		<Stack space={2}>
			<Text
				tx={"home.quickMedicalAttention"}
			// fontSize="xl"
			// fontWeight="bold"
			>
				Need quick medical attention?
			</Text>
			{isLocationLoading && !location && (
				<Text>Acquiring user location</Text>
			)}
			{location && (
				<Pressable
					onPress={handleNearByFacilityPress}
				>
					{/* Find mean to set relative width: 160 -> 33%?? */}
					<Center
						// height={100}
						bgColor="#FFF"
						rounded="md"
						shadow={4}
						padding={6}

					>
						<FacilityIllustration size={70} />
						<Text
							fontWeight="800"
							textAlign="center"
							tx="home.facilitiesNearYou"
						>
							Facilities near you
						</Text>
					</Center>
				</Pressable>
			)}
			{!location && !isLocationLoading && (
				<Text>There was an error in Acquiring Your Location</Text>
			)}
		</Stack>
	);
};

const UpcomingAppointments = () => {
	const user = auth().currentUser;

	const { profile } = useAuth();

	const { appointments = [] } = usePatientAppointments(profile?.id);
	const navigation = useNavigation();
	const appointment = appointments[0];

	const openAppointment = (appointment: any) => {
		navigation.navigate(HomeNavKey.AppointmentInfo, { appointment });
	};

	if (!user) return null;


	return (
		<View>
			{user && appointment && (
				<Stack px={1}>
					<View marginBottom={6}>
						<Text
							tx="home.upcomingAppointments"
							fontSize="xl"
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
							<Text
								textAlign="right"
								my={2}
								color="gray.500"
								tx="home.seeAllAppointments"
							>
								See All Appointments
							</Text>
						</TouchableOpacity>
					</View>
				</Stack>
			)}
		</View>
	);
};
export default function Home() {
	// const user = auth().currentUser;
	// const profile = useSelector((store: RootState) => store.profile);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const { user, profile, loading } = useAuth();

	const handleAccountPress = () => {
		if (profile && profile?.uid) {
			// navigate to seeing details
			navigation.navigate(HomeNavKey.Profile);
		} else {
			navigation.navigate(HomeNavKey.Login);
		}
	};

	useEffect(() => {
		if (!profile && !loading && user) {
			// console.log("Loading state");
			// console.log(profile, loading, auth().currentUser);
			navigation.navigate(HomeNavKey.CreateProfile);
		}
		// dispatch(resetAppointmentState());
	}, [profile]);

	// console.warn("Current user : ", profile, auth().currentUser);

	const userExistsPatient = user && (profile?.type === "patient")
	if (loading) {
		return (
			<LoadingFullScreen />
		);
	}
	return (
		<MainContainer
			leftSection={() => (
				<HStack space={4}>
					<Pressable onPress={handleAccountPress}>
						<IconContainer>
							<UserIcon size={6} color="#561BB3" />
						</IconContainer>
					</Pressable>
				</HStack>
			)}
			rightSection={() => (
				<HStack space={4}>

					{/* TODO : TO BE UNCOMMENTED WHEN IMPLEMENTING THE NOTIFICATION FEATURE */}
					{/* <Pressable
						onPress={() => {
							// navigation.navigate(HomeNavKey.Notification);

							ToastAndroid.show("Coming soon!", 3000);
						}}
					>
						<IconContainer>
							<BellIcon size={6} color="#561BB3" />
						</IconContainer>
					</Pressable> */}

					{(!userExistsPatient) &&
						<Pressable
							onPress={() => {
								navigation.navigate(DoctorRoutes.DoctorLogin);
							}}
						>
							<IconContainer>
								<Icon name="doctor" size={25} color="#561BB3" />
							</IconContainer>
						</Pressable>

					}

				</HStack>
			)}
		>
			<ScrollView
				width="100%"
				testID="Home"
				contentContainerStyle={{ padding: 12 }}
				pb={10}
				backgroundColor="#F4F6FA"
			>
				<ProfileInformation profile={profile} user={user} />
				<Spacer size={30} />
				<UpcomingAppointments />
				<ScheduleAppointmentSection />

				<Spacer size={30} />

				<VStack
					space={4}
					marginTop={3}
					justifyContent="space-between"
					px={1}
					py={2}
				>
					{/* <LocationHelper /> */}
					<AccountDetails
						profile={profile}
						handleAccountPress={handleAccountPress}
					/>
				</VStack>
			</ScrollView>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate(HomeNavKey.RemoteConsultation);
				}}
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "center",
					marginBottom: 10,
				}}
				activeOpacity={0.8}
			>
				<Text>.</Text>
			</TouchableOpacity>
		</MainContainer>
	);
}

// TOO: move this component and all its atom to component folder
export const ScheduleAppointmentSection = () => {
	const { navigate } = useNavigation();
	const [speciality] = useSelector(
		({ appointment }: RootState) => [
			appointment.speciality
		],
		shallowEqual
	);

	const handleOnPress = () => {

		if (!Boolean(speciality)) {
			ToastAndroid.show("Please select doctors speciality", 3000);
			return
		}
		navigate(HomeNavKey.ConsultantList);

	};


	return (
		<>
			<Text
				tx="home.scheduleAnAppointment"
				fontSize="xl"
				marginBottom={1}
				fontWeight="bold"
			>
				Schedule an appointment
			</Text>
			<Box bgColor="#FFF" rounded="xl" shadow={4} p={3}>
				<Stack space={5} py={2}>
					<AppointmentCustomizer />
					<PrimaryButton onPress={handleOnPress}>
						<Text tx="home.schedule" color="white">
							Schedule Appointment
						</Text>
					</PrimaryButton>
					<LocationHelper />
				</Stack>
			</Box>
		</>
	);
};
