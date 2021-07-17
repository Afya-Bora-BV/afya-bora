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

// import auth from '@react-native-firebase/auth';

const signOut = async () => {
	// await auth().signOut()
	console.log("Sign Out");
};

function ProfileCard({ userProfile, ...props }) {
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
			<HStack space={3} justifyContent="center" >
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
					<Text color="#747F9E">{userProfile.phoneNumber}</Text>
				</VStack>
			</HStack>

			<Pressable flex={1} alignItems="flex-end" justifyContent="center">
				<IconContainer>
					<NextIcon color="#7065E4" />
				</IconContainer>
			</Pressable>
		</HStack>
	);
}

const profileOptions = [
	{
		icon: AccountIcon,
		title: "Profile",
		onNavigate: (navigation: any) =>
			navigation.navigate(ProfileNavKey.ProfileScreen),
	},
	{
		icon: UpdateClock,
		title: "Q & A History",
	},
	{
		icon: MapPinIcon,
		title: "Address",
	},
	{
		icon: CardIcon,
		title: "Payment Method",
	},
	{
		icon: HeadphoneIcon,
		title: "Help Center",
	},
	{
		icon: PhoneIcon,
		title: "Hotline",
	},
	{
		icon: InfoIcon,
		title: "About Us",
	},
];

const ProfileMain: React.FC = () => {
	const navigation = useNavigation();
	const { signOut, user } = useAuthStore(state => ({ signOut: state.signOut, user: state.user }))

	const { height } = Dimensions.get("screen");

	const userProfile = {
		name: user?.name,
		phoneNumber: user?.phone,
	};

	console.log("User", user)

	return (
		<AlternateContainer
			title="Profile"
			titleColor="#FFF"
			barStyle="dark-content"
			backdropHeight={height / 7}
			bgColor="#7065E4"
		>
			<VStack alignItems="center" margin={8} marginTop={5} space={4}>
				<ProfileCard userProfile={userProfile} />
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
							({ icon: ActualIcon, title, onNavigate }, ix) => (
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
						<Pressable
							onPress={signOut}
						>
							<HStack alignItems="center" space={3}>
								<Square size={6}>
									<LogoutIcon />
								</Square>
								<Text fontSize={18}>Logout</Text>
							</HStack>
						</Pressable>
					</VStack>
				</Box>
			</VStack>
		</AlternateContainer>
	);
};

export default ProfileMain;
