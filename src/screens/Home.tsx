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
} from "native-base";
import UserIcon from "../assets/icons/User";
import BellIcon from "../assets/icons/Bell";
import SearchIcon from "../assets/icons/Search";
import MedicalHistoryIcon from "../assets/icons/MedicalHistory";

import AppointmentIllustration from "../assets/illustrations/AppointmentIllustration";
import OnlineConsulationIllustration from "../assets/illustrations/OnlineConsulationIllustration";
import NewspaperIllustration from "../assets/illustrations/NewspaperIllustration";

import BackgroundOne from "../assets/illustrations/BackgroundOne";
import { useNavigation } from "@react-navigation/native";
import { TopRatedSpecialists } from "../components/cards";

const IconContainer: React.FC = ({ children }) => {
	return (
		<Center p={4} backgroundColor="#E7E5FF" borderRadius="4">
			{children}
		</Center>
	);
};

const HeroIllustrationContainer: React.FC = ({ children }) => {
	return (
		<VStack
			justifyContent="center"
			flex={1}
			m={2}
			alignItems="center"
			borderWidth={1}
			p={4}
			borderColor="#B0B3C7"
			borderRadius={6}
		>
			{children}
		</VStack>
	);
};

const Home = () => {
	const navigation = useNavigation();

	return (
		<ScrollView>
			<VStack p={2} space={6} paddingTop={10}>
				<HStack justifyContent="space-between" alignItems="center">
					<IconContainer>
						<UserIcon color="#561BB3" />
					</IconContainer>
					<HStack space={4}>
						<IconContainer>
							<BellIcon color="#561BB3" />
						</IconContainer>
						<IconContainer>
							<SearchIcon color="#561BB3" />
						</IconContainer>
					</HStack>
				</HStack>

				<VStack>
					<Text color="#B0B3C7" fontSize="md">
						4 July 2021
					</Text>
					<Heading fontSize="xl">Hi, Ally Salim</Heading>
				</VStack>

				<VStack space={4}>
					<Heading fontSize="md">Upcoming Appointments</Heading>
					<HStack
						justifyContent="space-between"
						alignItems="center"
						borderRadius={6}
						borderColor="#B0B3C7"
						borderWidth={1}
						p={6}
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

				<VStack>
					<Heading fontSize="md">How can we help?</Heading>
					<HStack justifyContent="space-between">
						<HeroIllustrationContainer>
							<AppointmentIllustration size={70} />
							<Text textAlign="center">Book an appointment</Text>
						</HeroIllustrationContainer>

						<HeroIllustrationContainer>
							<OnlineConsulationIllustration size={70} />
							<Text textAlign="center">Online consultation</Text>
						</HeroIllustrationContainer>

						<Pressable
							onPress={() => {
								navigation.navigate("Service");
							}}
						>
							<HeroIllustrationContainer>
								<NewspaperIllustration size={70} />
								<Text textAlign="center">Find a Facility</Text>
							</HeroIllustrationContainer>
						</Pressable>
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

export default Home;
