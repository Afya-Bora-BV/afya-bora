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
import SearchIcon from "../../../assets/icons/Search";
import MedicalHistoryIcon from "../../../assets/icons/MedicalHistory";

import AppointmentIllustration from "../../../assets/illustrations/AppointmentIllustration";
import OnlineConsulationIllustration from "../../../assets/illustrations/OnlineConsulationIllustration";
import FacilityIllustration from "../../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { HomeNavKey } from "./_navigator";
import { colors } from "../../../constants/colors";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";

import {
	DemoAppointmentType,
	useAppointmentTempoStore,
} from "../../../internals/appointment/context";
import { useQuery } from "react-query";
import { AppointmentAlert } from "../../../components/core/appointment";
import { useAuthStore } from "../../../internals/auth/context";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { RealTimeAppointment } from "../../../types";
import axios from "axios";
import { API_ROOT } from "../../../api";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavKey } from "./BookAppointment/_navigator";
import HomeScreenIllustration from "../../../assets/illustrations/HomeScreenIllustration";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/Spacer";
import { PrimaryButton } from "../../../components/button";

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
			navigation.navigate(HomeNavKey.BookAppointmentViewScreen);
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

export const ScheduleAppointmentSection = () => {
	const [appointmentType, setAppointmentType] = useState("offline");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CompleteProfileInputs>({
		// resolver: yupResolver(schema),
	});
	return (
		<Box bgColor="#FFF" rounded="xl" shadow={4} p={3}>
			<Stack space={5} py={2}>
				<Stack>
					<Text>Choose Type of Appointment</Text>

					<Spacer size={10} />

					<View
						style={{
							flexDirection: "row",
							flex: 1,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								setAppointmentType("offline");
							}}
							style={{
								backgroundColor:
									appointmentType === "offline"
										? colors.primary
										: "white",

								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 10,
								borderColor:
									appointmentType === "offline"
										? colors.primary
										: "grey",
								borderWidth: 1,
								paddingVertical: 16,
							}}
						>
							<Text
								style={{
									color:
										appointmentType === "offline"
											? "white"
											: "grey",
								}}
							>
								At Facility
							</Text>
						</TouchableOpacity>

						<Spacer size={20} horizontal />

						<TouchableOpacity
							onPress={() => {
								setAppointmentType("online");
							}}
							style={{
								backgroundColor:
									appointmentType === "online"
										? colors.primary
										: "white",

								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 10,
								borderColor:
									appointmentType === "online"
										? colors.primary
										: "grey",
								borderWidth: 1,
								paddingVertical: 16,
							}}
						>
							<Text
								style={{
									color:
										appointmentType === "online"
											? "white"
											: "grey",
								}}
							>
								Online (Virtual)
							</Text>
						</TouchableOpacity>
					</View>
				</Stack>

				<Stack>
					<Text>Choose Location</Text>
					<Spacer size={10} />
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								variant="rounded"
								selectedValue={value}
								minWidth={200}
								accessibilityLabel="Location"
								placeholder="Location"
								onValueChange={(itemValue) =>
									onChange(itemValue)
								}
								_selectedItem={{
									bg: "cyan.600",
									endIcon: <CheckIcon size={4} />,
								}}
							>
								{regions.map((region) => (
									<Select.Item
										label={region.name}
										value={region.name}
									/>
								))}
							</Select>
						)}
						name="location"
						// rules={{ required: true }}
						defaultValue=""
					/>
				</Stack>

				<Stack>
					<Text>Choose Speciality</Text>
					<Spacer size={10} />
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Select
								variant="rounded"
								selectedValue={value}
								minWidth={200}
								accessibilityLabel="Speciality"
								placeholder="Speciality"
								onValueChange={(itemValue) =>
									onChange(itemValue)
								}
								_selectedItem={{
									bg: "cyan.600",
									endIcon: <CheckIcon size={4} />,
								}}
							>
								{specialities.map((speciality) => (
									<Select.Item
										label={speciality.name}
										value={speciality.name}
									/>
								))}
							</Select>
						)}
						name="speciality"
						// rules={{ required: true }}
						defaultValue=""
					/>
				</Stack>
				<PrimaryButton text={"Schedule"} />
			</Stack>
		</Box>
	);
};

// TODo : to extended as appointment data grows

// TODO: find a better place to fetch all the data

// export const UpcomingAppointmentsSection = () => {
// 	const navigation = useNavigation();
// 	const { profile } = useAuthStore((state) => ({ profile: state.profile }));

// 	const [appointments, setAppointments] = useState<RealTimeAppointment[]>([]);
// 	useEffect(() => {
// 		const subscriber = firestore()
// 			.collection("appointments")
// 			.where("pid", "==", profile?.id)
// 			// .where("status","!=","cancelled")
// 			.onSnapshot((documentSnapshot) => {
// 				const shots = [
// 					...documentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
// 				];
// 				setAppointments(shots as RealTimeAppointment[]);
// 			});

// 		// Stop listening for updates when no longer required
// 		return () => subscriber();
// 	}, [profile?.id]);

// 	console.log("Appontments :");

// 	const currentAppointments = appointments.filter((appointment) => {
// 		console.log(
// 			"What current appointment : ",
// 			appointment.status !== "cancelled"
// 		);
// 		return appointment.status !== "cancelled";
// 	});

// 	console.log(JSON.stringify(currentAppointments, null, 3));

// 	return (
// 		<VStack space={4} marginTop={8}>
// 			<Heading fontSize="xl">Upcoming Appointments</Heading>
// 			<VStack space={3}>
// 				<AppointmentAlert
// 					appointment={currentAppointments[0]}
// 					onPress={() => {
// 						navigation.navigate(HomeNavKey.AppointmentInfoScreen, {
// 							appointment: currentAppointments[0],
// 						});
// 					}}
// 				/>

// 				<View width="100%" alignItems="flex-end">
// 					<Pressable onPress={() => console.log("Something")}>
// 						<Text fontStyle="italic">See All Appointments</Text>
// 					</Pressable>
// 				</View>
// 			</VStack>
// 		</VStack>
// 	);
// };
// interface Consultant {
// 	id: string;
// 	name: string;
// 	gender: "male" | "female";
// 	facility: { name: string; address: string };
// 	clinicianType: string;
// 	specialities: string[];
// 	rating: number;
// 	ratedBy: number;
// }

// const getConsultants = async (): Promise<Consultant[]> => {
// 	console.log("Get consultant list ", `${API_ROOT}/v0/data/consultants`);
// 	const res = await axios.get<Consultant[]>(
// 		`${API_ROOT}/v0/data/consultants`
// 	);
// 	const consultants: Consultant[] = await res.data.data;
// 	return consultants;
// };

// const TopRatedSpecialistsSection = () => {
// 	const navigation = useNavigation();
// 	const Toast = useToast();

// 	const { data: consultants, error } = useQuery(
// 		["consultants"],
// 		getConsultants
// 	);

// 	useEffect(() => {
// 		if (error !== undefined && error !== null) {
// 			console.error(error);
// 			// Show message
// 			Toast.show({
// 				title: "Unable to load results",
// 				description: String(error),
// 			});
// 		}
// 	}, [error]);

// 	const selectConsultant = useCallback(
// 		(consultant: any) => {
// 			navigation.navigate(HomeNavKey.BookAppointmentViewScreen, {
// 				screen: NavKey.SetAppointmentTimeScreen,
// 				params: { consultant, },
// 			});
// 		},
// 		[navigation]
// 	);

// 	// console.log(JSON.stringify(consultants, null, 4));

// 	const topSpecialists = consultants?.filter(
// 		(consultants) => consultants.rating > 4
// 	);

// 	return (
// 		<VStack>
// 			<View padding={5}>
// 				<Heading fontSize="xl">Top Rated Specialists</Heading>
// 			</View>
// 			{topSpecialists !== undefined && (
// 				<ScrollView
// 					horizontal={true}
// 					showsHorizontalScrollIndicator={false}
// 					alwaysBounceHorizontal
// 				>
// 					<HStack justifyContent="space-between" marginX={3}>
// 						{topSpecialists.map((consultant) => (
// 							<Pressable
// 								onPress={() => selectConsultant(consultant)}
// 							>
// 								<Box
// 									paddingX={6}
// 									paddingY={8}
// 									bgColor={"#258FBE"}
// 									rounded="xl"
// 									marginX={2}
// 									width={200}
// 									minHeight={250}
// 								>
// 									<VStack>
// 										<Heading
// 											fontSize="xl"
// 											color={"#FFFFFF"}
// 										>
// 											Dr. {consultant.name}
// 										</Heading>
// 										<VStack space={2} marginTop={3}>
// 											<View>
// 												<Text
// 													fontSize="sm"
// 													color={"#FFFFFF"}
// 												>
// 													{
// 														consultant.facility
// 															.address
// 													}
// 												</Text>
// 											</View>
// 											<View>
// 												<Text
// 													fontSize="sm"
// 													color={"#FFFFFF"}
// 												>
// 													{consultant.specialities}
// 												</Text>
// 											</View>
// 											<View flexDirection="row">
// 												<MaterialCommunityIcons
// 													name="star"
// 													color="yellow"
// 												/>
// 												<Text
// 													fontSize="sm"
// 													color={"#FFFFFF"}
// 												>
// 													{consultant.rating} (
// 													{consultant.ratedBy})
// 												</Text>
// 											</View>
// 										</VStack>
// 									</VStack>
// 								</Box>
// 							</Pressable>
// 						))}
// 					</HStack>
// 				</ScrollView>
// 			)}
// 		</VStack>
// 	);
// };
