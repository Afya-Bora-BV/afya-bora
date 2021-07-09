import React, { Children } from "react";
import {
	Box,
	Center,
	HStack,
	VStack,
	Text,
	Heading,
	ZStack,
	Pressable,
	ScrollView,
	StatusBar,
} from "native-base";
import UserIcon from "../assets/icons/User";
import BellIcon from "../assets/icons/Bell";
import SearchIcon from "../assets/icons/Search";
import MedicalHistoryIcon from "../assets/icons/MedicalHistory";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import AppointmentIllustration from "../assets/illustrations/AppointmentIllustration";
import OnlineConsulationIllustration from "../assets/illustrations/OnlineConsulationIllustration";
import FacilityIllustration from "../assets/illustrations/FacilityIllustration";

import BackgroundOne from "../assets/illustrations/BackgroundOne";
import { useNavigation } from "@react-navigation/native";
import { TopRatedSpecialists } from "../components/cards";
import moment from "moment";
import { TouchableOpacity } from "react-native";

const IconContainer: React.FC = ({ children }) => {
	return (
		<Center p={2} backgroundColor="#E7E5FF" borderRadius={8}>
			{children}
		</Center>
	);
};

const HeroIllustrationContainer: React.FC<{ onPress: () => void }> = ({
	onPress,
	children,
}) => {
	return (
		<VStack
			// justifyContent="center"
			flex={1}
			// m={2}
			// alignItems="center"
			p={2}
			borderRadius={6}
			bg="white"
			shadow={2}
		>
			<TouchableOpacity
				activeOpacity={0.3}
				onPress={onPress}
				style={{ alignItems: "center" }}
			>
				{children}
			</TouchableOpacity>
		</VStack>
	);
};

const Home = () => {
	const { navigate } = useNavigation();
	const hasUpcomingAppointment = true;

	return (
		<ScrollView paddingTop={16}>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<VStack paddingX={3} space={6}>
				<HStack justifyContent="space-between" alignItems="center">
					<IconContainer>
						{/* <UserIcon color="#561BB3" /> */}
						<Icon
							name="account-outline"
							color="#561BB3"
							size={24}
						/>
					</IconContainer>
					<HStack space={4}>
						<IconContainer>
							{/* <BellIcon color="#561BB3" /> */}
							<Icon
								name="bell-outline"
								color="#561BB3"
								size={24}
							/>
						</IconContainer>
						<IconContainer>
							{/* <SearchIcon color="#561BB3" /> */}
							<Icon name="magnify" color="#561BB3" size={24} />
						</IconContainer>
					</HStack>
				</HStack>

				<VStack space={2}>
					<Text color="#B0B3C7" fontSize="md">
						{moment().format("D MMMM YYYY")}
					</Text>
					<Heading fontSize="3xl">Hi, Ally Salim</Heading>
				</VStack>

				{hasUpcomingAppointment && <UpcomingAppointmentsAlert />}

				<VStack>
					<Heading fontSize="lg">How can we help?</Heading>
					<HStack
						space={4}
						marginTop={3}
						justifyContent="space-between"
					>
						<HeroIllustrationContainer
							onPress={() => navigate("ConsultantsList")}
						>
							<AppointmentIllustration size={70} />
							<Text textAlign="center">Appointment Booking</Text>
						</HeroIllustrationContainer>

						<HeroIllustrationContainer
							onPress={() =>
								navigate("OnlineConsultantSelectTime")
							}
						>
							<OnlineConsulationIllustration size={70} />
							<Text textAlign="center" flexWrap="wrap">
								Online Consult
							</Text>
						</HeroIllustrationContainer>

						{/* <Pressable
							onPress={() => {
								navigate("Service");
							}}
						> */}
						<HeroIllustrationContainer
							onPress={() => navigate("FindFacility")}
						>
							<FacilityIllustration size={70} />
							<Text textAlign="center">Find a Facility</Text>
						</HeroIllustrationContainer>
						{/* </Pressable> */}
					</HStack>
				</VStack>

				<VStack>
					<Heading fontSize="md">Top Rated Specialists</Heading>

					<ScrollView horizontal={true} m={2} height={250}>
						<HStack
							justifyContent="space-between"
							paddingBottom={10}
							minWidth={"90%"}
						>
							<TopRatedSpecialists
								name={"Dr. Maryam Mohamedali"}
								gender={"female"}
							/>
							<TopRatedSpecialists
								name={"Dr. Wyckliffe Sango"}
								gender={"male"}
							/>
							<TopRatedSpecialists
								name={"Dr. Ally Salim"}
								gender={"male"}
							/>
						</HStack>
					</ScrollView>
				</VStack>
			</VStack>
		</ScrollView>
	);
};

const UpcomingAppointmentsAlert = () => {
	return (
		<VStack space={4}>
			<Heading fontSize="md">Upcoming Appointments</Heading>
			<HStack
				justifyContent="space-between"
				alignItems="center"
				borderRadius={6}
				borderColor="#B0B3C7"
				borderWidth={1}
				p={4}
			>
				<HStack
					justifyContent="space-between"
					alignItems="center"
					space={4}
				>
					<MedicalHistoryIcon />
					<Text>Meet Dr. Mohamedali</Text>
				</HStack>
				<Text color="#258FBE">14:30 PM</Text>
			</HStack>
		</VStack>
	);
};

export default Home;
