import React, { Children } from "react";
import {
	Box,
	Center,
	HStack,
	VStack,
	Text,
	View,
	Heading,
	ZStack,
	Pressable,
	ScrollView,
	StatusBar,
	Square,
} from "native-base";
import UserIcon from "../../assets/icons/User";
import BellIcon from "../../assets/icons/Bell";
import SearchIcon from "../../assets/icons/Search";
import MedicalHistoryIcon from "../../assets/icons/MedicalHistory";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import AppointmentIllustration from "../../assets/illustrations/AppointmentIllustration";
import OnlineConsulationIllustration from "../../assets/illustrations/OnlineConsulationIllustration";
import FacilityIllustration from "../../assets/illustrations/FacilityIllustration";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";


import { HomeNavKey as MainNavKey } from '.'
import _BaseContainer from "../../components/containers/_BaseContainer";
import { colors } from "../../contants/colors";
// import auth from '@react-native-firebase/auth';

const IconContainer: React.FC = ({ children }) => {
	return (
		<Square p={2} backgroundColor="#E7E5FF" borderRadius={8}>
			{children}
		</Square>
	);
};


const helpOptions = [
	{
		illustration: AppointmentIllustration,
		title: "Book an Appointment",
		onNavigate: (navigation: any) => navigation.navigate(MainNavKey.BookAppointmentViewScreen)
	},
	{
		illustration: OnlineConsulationIllustration,
		title: "Online Consultation",
		onNavigate: (navigation: any) => navigation.navigate(MainNavKey.OnlineConsultViewScreen)
	},
	{
		illustration: FacilityIllustration,
		title: "Find a Facility",
		onNavigate: (navigation: any) => navigation.navigate(MainNavKey.BookAppointmentViewScreen)
	},
]

function MainContainer ({ children, title, leftSection: LeftSection, rightSection: RightSection }: any) {
	return (
		<_BaseContainer>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<Box width={"100%"} flex={1}>
				{/* Header */}
				<View flexDirection="row" bgColor="#003F5E" paddingX={5} paddingY={3}>
					{ LeftSection !== undefined ?  <LeftSection /> : null }
					<View flexGrow={1} flexDirection="row">
						{title}
					</View>
					{ RightSection !== undefined ?  <RightSection /> : null }
				</View>
				{/* Body */}
				<View>
					{ children }
				</View>
			</Box>
		</_BaseContainer>
	)
}

export default function Home () {
	const navigation = useNavigation();

	return (
		<MainContainer
			leftSection={
				() => (
					<IconContainer>
						<UserIcon size={6} color="#561BB3" />
					</IconContainer>
				)
			}
			rightSection={
				() => (
					<HStack space={4}>
						<IconContainer>
							<BellIcon size={6} color="#561BB3" />
						</IconContainer>
						<IconContainer>
							<SearchIcon size={6} color="#561BB3" />
						</IconContainer>
					</HStack>
				)
			}
		>
			<ScrollView width="100%">
				{/* Welcome section */}
				<VStack space={2} padding={5}>
					<Text color="#B0B3C7" fontSize="md">
						{moment().format("D MMMM YYYY")}
					</Text>
					<Heading fontSize="3xl">Hi, Ally Salim</Heading>
				</VStack>

				{/* Section to render upcoming appointments if any.
					NOTE: To prevent re-rendering, dont use inline if statements
					*/}
				<UpcomingAppointmentsSection />

				<VStack padding={5}>
					<Heading fontSize="xl">How can we help?</Heading>
					<HStack
						space={4}
						marginTop={3}
						justifyContent="space-between"
					>
						{
							helpOptions.map(({ illustration: Illustration, onNavigate, title }, ix) => (
								<Pressable onPress={() => onNavigate(navigation)}>
									{/* Find mean to set relative width: 160 -> 33%?? */}
									<Center 
										width={140} 
										height={200} 
										paddingY={3} 
										bgColor="#FFF" 
										rounded="xl"
										shadow={4}>
										<Illustration size={100} />
										<Text fontWeight="800" marginTop={5} textAlign="center" wordBreak="break-word" overflowWrap="break-word">
											{title}
										</Text>
									</Center>
								</Pressable>
							))
						}
					</HStack>
				</VStack>

				<VStack>
					<View padding={5}>
						<Heading fontSize="xl">Top Rated Specialists</Heading>
					</View>

					<ScrollView
						horizontal={true} 
						showsHorizontalScrollIndicator={false} 
						alwaysBounceHorizontal>
						<HStack
							justifyContent="space-between"
							marginX={3}
						>
							{
								[
									{
										name: "Dr. Maryam Mohamedali",
										location: "Arusha, Tanzania",
										specialization: "Immunology, Gynecology, Internal Medicine",
										color: "#EEE",
										textColor: colors.primary
									},
									{
										name: "Dr. Wyckliffe Sango",
										color: "#258FBE"
									},
									{
										name: "Dr. Ally Salim",
										color: "#258FBE"
									},
								].map(({ color, name, location, specialization, textColor }, ix) => (
									<Box 
										paddingX={6}
										paddingY={8} 
										bgColor={color}  
										rounded="xl" 
										marginX={2}
										maxWidth={200} 
										minHeight={250}>
										<VStack>
											<Heading fontSize="md" color={textColor || "#FFFFFF"}>
												{name}
											</Heading>
											<VStack space={1} marginTop={3}>
												<View>
													<Text fontSize="sm">{location}</Text>
												</View>
												<View>
													<Text fontSize="sm">{specialization}</Text>
												</View>
											</VStack>
										</VStack>
									</Box>
								))
							}
						</HStack>
					</ScrollView>
				</VStack>
			</ScrollView>
		</MainContainer>
	);
};

const UpcomingAppointmentsSection = () => {

	const hasUpcomingAppointment = true;

	if (!hasUpcomingAppointment) {
		return null
	}

	return (
		<VStack space={4} marginX={5} marginTop={8}>
			<Heading fontSize="xl">Upcoming Appointments</Heading>
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
