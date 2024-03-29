import React from "react";
import {
	Box,
	ScrollView,
	Stack,
	VStack,
	HStack,
	Pressable,
	Avatar,
	Square,
	useToast,
} from "native-base";
import { Text } from "../../components/text";
import { Alert, Dimensions, ToastAndroid } from "react-native";
import { useAtom } from "jotai";
import i18n from "i18next";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AccountIcon from "../../assets/icons/AccountIcon";
import HeadphoneIcon from "../../assets/icons/HeadphoneIcon";
import InfoIcon from "../../assets/icons/InfoIcon";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import AlternateContainer from "../../components/containers/AlternateContainer";
import { IconContainer } from "../../components/misc";
import NextIcon from "../../assets/icons/NextIcon";
import auth from "@react-native-firebase/auth";
import { useMutation } from "react-query";
import OnlineConsulationIllustration from "../../assets/illustrations/OnlineConsulationIllustration";
import AppointmentIllustration from "../../assets/illustrations/AppointmentIllustration";
import HomeView, { HomeNavKey } from ".";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile } from "../../store/slices/profile";
import { RootState } from "../../store";

import { languageAtom } from "../../store/atoms";
import { useAuth } from "../../contexts/AuthContext";

function ProfileCard({}) {
	const navigation = useNavigation();
	const { profile } = useAuth();
	return (
		<HStack
			bg="white"
			shadow={2}
			rounded={10}
			width="100%"
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
				</Avatar>
				<VStack space={1} justifyContent="center">
					<Text fontWeight="600" fontSize="xl">
						{profile?.name}
					</Text>
					{/*<Text color="#747F9E">{profile?.id}</Text>*/}
				</VStack>
			</HStack>

			<Pressable flex={1} alignItems="flex-end" justifyContent="center">
				<IconContainer>
					<Pressable
						onPress={() => {
							navigation.navigate(HomeNavKey.EditHealthProfile);
						}}
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
		icon: HeadphoneIcon,
		title: "Help Center",
		text: "common.helpCenter",
		
	},
];

// FIXME: Need to clear out the clearProfileAtom
export default function ProfileMain() {
	const navigation = useNavigation();

	const [language, setLanguage] = useAtom(languageAtom);
	const [isLoading, setIsLoading] = React.useState(false);

	const { height } = Dimensions.get("screen");

	// FIXME: Ally you messed this up, fix!
	const signOutAndClearStore = async () => {
		try {
			await auth().signOut();
		} catch (e) {
			throw new Error("Something went wrong in signing out");
		}
	};

	const help = () => {
		ToastAndroid.show(
			"Please Contact Support: 0788 875 419",
			ToastAndroid.LONG
		);
	}

	const signOut = () => {
		Alert.alert(
			"Confirm",
			"Are you sure you want to sign out. By signing out you wont be able to book or access your appointments",
			[
				{ text: "Cancel" },
				{
					text: "Confirm",
					onPress: () => {
						setIsLoading(true);
						auth()
							.signOut()
							.then((res) => {
								ToastAndroid.show(
									"Signed out successuly.",
									ToastAndroid.SHORT
								);
								setIsLoading(false);
								navigation.dispatch(
									CommonActions.reset({
										index: 0,
										routes: [
											{ name: HomeNavKey.HomeScreen },
										],
									})
								);
							})
							.catch((err) => {
								console.log(err);
								ToastAndroid.show(
									"Something went wrong in signing out",
									ToastAndroid.SHORT
								);
								setIsLoading(false);
							});
					},
				},
			]
		);
	};

	const toggleLanguage = () => {
		const lng = language === "sw" ? "en" : "sw";

		i18n.changeLanguage(lng)
			.then((res) => {
				setLanguage(lng);
				ToastAndroid.show("Language changed.", ToastAndroid.SHORT);
			})
			.catch((error) =>
				ToastAndroid.show(
					"Error changing the language",
					ToastAndroid.SHORT
				)
			);
	};

	// console.log("Language : ",langu)
	return (
		<AlternateContainer
			title="common.profile"
			titleColor="#FFF"
			barStyle="dark-content"
			backdropHeight={height / 7}
			bgColor="#7065E4"
		>
			<ScrollView>
				<VStack alignItems="center" margin={6} marginTop={5} space={4}>
					<ProfileCard />

					<HStack
						space={4}
						marginTop={3}
						justifyContent="space-between"
					>
						<Box bg="white" shadow={2} rounded={10} width="50%">
							<Pressable
								onPress={() => {
									navigation.navigate(
										HomeNavKey.VisitHistory
									);
								}}
							>
								<HStack justifyContent={"center"} paddingY={2} paddingX={2}>
									<Stack flex={1}>
										<AppointmentIllustration size={60} />
									</Stack>
									<Stack flex={1.5} justifyContent="center">
										<Text
											tx="profile.visitHistory"
											textAlign="center"
										>
											Visit History
										</Text>
									</Stack>
								</HStack>
							</Pressable>
						</Box>

						<Box bg="white" shadow={2} rounded={10} width="45%">
							<Pressable
								onPress={() => {
									navigation.navigate(
										HomeNavKey.UpcomingAppointments
									);
								}}
							>
								<HStack justifyContent={"center"} paddingY={2} paddingX={2}>
									<Stack flex={1}>
										<OnlineConsulationIllustration
											size={60}
											color="red"
										/>
									</Stack>
									<Stack flex={1.5} justifyContent="center">
										<Text
											textAlign="center"
											tx="profile.upcomingVisits"
										>
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
							<Pressable onPress={toggleLanguage}>
								<HStack alignItems="center" space={3}>
									<Square size={6}>
										<AccountIcon />
									</Square>
									<Text
										fontSize={18}
										tx="common.switchLanguage"
									>
										Switch Language
									</Text>
								</HStack>
							</Pressable>
							{profileOptions.map(
								(
									{ icon: ActualIcon, title, onAction, text },
									ix
								) => (
									<Pressable
										key={`profOpt-${ix}`}
										onPress={help}
									>
										<HStack alignItems="center" space={3}>
											<Square size={6}>
												<ActualIcon />
											</Square>
											<Text tx={text} fontSize={18}>
												{}
											</Text>
										</HStack>
									</Pressable>
								)
							)}
							<Pressable onPress={signOut}>
								<HStack alignItems="center" space={3}>
									<Square size={6}>
										<LogoutIcon />
									</Square>
									<Text
										fontSize={18}
										tx={
											!isLoading
												? "common.logout"
												: "common.loading"
										}
									>
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
}
