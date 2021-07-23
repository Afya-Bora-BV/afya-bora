import React from "react";
import {
	Box,
	Center,
	Heading,
	ScrollView,
	Stack,
	StatusBar,
	View,
	VStack,
	Text,
	HStack,
	Pressable,
	Spacer,
	Icon,
	Avatar,
	Square,
} from "native-base";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AccountIcon from "../../../assets/icons/AccountIcon";
import UpdateClock from "../../../assets/icons/UpdateClock";
import MapPinIcon from "../../../assets/icons/MapPinIcon";
import CardIcon from "../../../assets/icons/CardIcon";
import HeadphoneIcon from "../../../assets/icons/HeadphoneIcon";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { ProfileNavKey } from "./_navigator";
import AlternateContainer from "../../../components/containers/AlternateContainer";
import { IconContainer } from "../../../components/misc";
import NextIcon from "../../../assets/icons/NextIcon";
import { useAuthStore } from "../../../internals/auth/context";
import auth from "@react-native-firebase/auth";
import { useMutation } from "react-query";
import OnlineConsulationIllustration from "../../../assets/illustrations/OnlineConsulationIllustration";
import AppointmentIllustration from "../../../assets/illustrations/AppointmentIllustration";
import { NoAppointment } from "./UpcomingAppointments";

// import auth from '@react-native-firebase/auth';

// const signOut = async () => {
// 	// await auth().signOut()
// 	console.log("Sign Out");
// };

function ProfileCard({ userProfile, onPress, ...props }) {
	return (
		<HStack
			bg="white"
			shadow={2}
			rounded={10}
			width="100%"
			{...props}
			padding={3}
			maxHeight={100}
		>
			<HStack space={3} justifyContent="center">
				<Avatar
					size="lg"
					borderRadius={10}
					source={{
						uri: "https://organicfeeds.com/wp-content/uploads/2021/03/How-To-Raise-A-Baby-Duck-scaled-1.jpg",
					}}
				>
					SS
				</Avatar>
				<VStack space={1} justifyContent="center">
					<Text fontWeight="600" fontSize="xl">
						{userProfile.name}
					</Text>
					<Text color="#747F9E">{userProfile.subText}</Text>
				</VStack>
			</HStack>

			<Pressable flex={1} alignItems="flex-end" justifyContent="center">
				<IconContainer>
					<Pressable
						onPress={onPress}
					>
						<NextIcon color="#7065E4" />
					</Pressable>
				</IconContainer>
			</Pressable>
		</HStack>
	);
}

const profileOptions = [
	{
		icon: AccountIcon,
		title: "Switch Profile",
		onNavigate: (navigation: any) =>
			navigation.navigate(ProfileNavKey.MainScreen, {
				screen: ProfileNavKey.ProfileScreen,
			}),
	},

	{
		icon: HeadphoneIcon,
		title: "Help Center",
	},

	{
		icon: InfoIcon,
		title: "About Us",
	},
];

export default function ProfileMain () {
	const navigation = useNavigation();
	const { profile, clearProfile } = useAuthStore((state) => ({
		profile: state.profile,
		clearProfile: state.clearProfile,
	}));

	const { height } = Dimensions.get("screen");

	const userProfile = {
		name: profile?.name,
		subText: profile?.phoneNumber || profile?.email || "Patient",
	};

	// TODO : considering moving the logic out
	// currently kept here so as to update the global store
	// possibly codes for cleaning the global store can be kept in onSuccess of useMutation()
	const signOutAndClearStore = async () => {
		await auth().signOut();
		clearProfile();
	};

	const signOut = () => {
		logout();
	};

	const { isLoading, mutate: logout } = useMutation(signOutAndClearStore, {
		onError: (error, variables, context) => {
			// An error happened!
			console.log(`error on signing out  `, error);
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			console.log("Signned out successuly ");
		},
	});

	console.log("Profile ", profile);
	return (
		<AlternateContainer
			title="Profile"
			titleColor="#FFF"
			barStyle="dark-content"
			backdropHeight={height / 7}
			bgColor="#7065E4"
		>
			<ScrollView>
				<VStack alignItems="center" margin={8} marginTop={5} space={4}>
					<ProfileCard userProfile={userProfile} onPress={() => {
							navigation.navigate(
								ProfileNavKey.EditHealthProfile
							);
						}} />
					<HStack
						space={4}
						marginTop={3}
						justifyContent="space-between"
					>
						<Box bg="white" shadow={2} rounded={10} width="45%">
							<Pressable
								onPress={() => {
									navigation.navigate(
										ProfileNavKey.VisitHistory
									);
								}}
							>
								<HStack justifyContent={"center"} paddingY={2}>
									<Stack flex={1}>
										<AppointmentIllustration size={60} />
									</Stack>
									<Stack flex={1.5} justifyContent="center">
										<Text textAlign="center">
											Visit History
										</Text>
									</Stack>
								</HStack>
							</Pressable>
						</Box>

						<Box bg="white" shadow={2} rounded={10} width="45%">
							<Pressable onPress={() => {navigation.navigate(
										ProfileNavKey.UpcomingAppointments
									);}}>
								<HStack justifyContent={"center"} paddingY={2}>
									<Stack flex={1}>
										<OnlineConsulationIllustration
											size={60}
											color="red"
										/>
									</Stack>
									<Stack flex={1.5} justifyContent="center">
										<Text textAlign="center">
											Upcoming Visits
										</Text>
									</Stack>
								</HStack>
							</Pressable>
						</Box>
					</HStack>
					<Box
						bg="white"
						shadow={2}
						rounded={10}
						width="100%"
						paddingX={5}
						paddingY={5}
					>
						<VStack space={10}>
							{profileOptions.map(
								(
									{ icon: ActualIcon, title, onNavigate },
									ix
								) => (
									<Pressable
										key={`profOpt-${ix}`}
										onPress={
											onNavigate !== undefined
												? () => onNavigate(navigation)
												: undefined
										}
									>
										<HStack alignItems="center" space={3}>
											<Square size={6}>
												<ActualIcon />
											</Square>
											<Text fontSize={18}>{title}</Text>
										</HStack>
									</Pressable>
								)
							)}
							<Pressable onPress={signOut}>
								<HStack alignItems="center" space={3}>
									<Square size={6}>
										<LogoutIcon />
									</Square>
									<Text fontSize={18}>
										{isLoading
											? "Logging out ... "
											: "Logout"}
									</Text>
								</HStack>
							</Pressable>
						</VStack>
					</Box>
				</VStack>
			</ScrollView>
		</AlternateContainer>
	);
};
