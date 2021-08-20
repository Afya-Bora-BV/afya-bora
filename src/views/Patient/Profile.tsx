import React from "react";
import {
	Box,
	ScrollView,
	Stack,
	VStack,
	Text,
	HStack,
	Pressable,
	Avatar,
	Square,
	useToast,
} from "native-base";
import { Dimensions } from "react-native";
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

function ProfileCard({ }) {
	const navigation = useNavigation()
	const currentProfile = useSelector(
		({ profile }: RootState) => profile
	);
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
					SS
				</Avatar>
				<VStack space={1} justifyContent="center">
					<Text fontWeight="600" fontSize="xl">
						{currentProfile?.profile?.name}
					</Text>
					<Text color="#747F9E">{currentProfile?.profile?.id}</Text>
				</VStack>
			</HStack>

			<Pressable flex={1} alignItems="flex-end" justifyContent="center">
				<IconContainer>
					<Pressable
						onPress={() => {
							navigation.navigate(HomeNavKey.EditHealthProfile)
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
		icon: AccountIcon,
		title: "Switch Profile",
		onAction: (action: () => void) => action(),
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

// FIXME: Need to clear out the clearProfileAtom
export default function ProfileMain() {
	const navigation = useNavigation();
	const Toast = useToast();
	const dispatch = useDispatch();

	const { height } = Dimensions.get("screen");

	const signOutAndClearStore = async () => {
		try {
			await auth().signOut();
			dispatch(clearProfile());
		} catch (e) {
			throw new Error("Something went wrong in signing out");
		}
	};

	const signOut = () => {
		auth()
			.signOut()
			.then((res) => {
				Toast.show({
					title: "Signed out successuly.",
				});
				navigation.navigate(HomeNavKey.HomeScreen);
			})
			.catch((err) => {
				console.log(err);
				Toast.show({
					title: "Something went wrong in signing out",
				});
			});
	};

	const { isLoading, mutate: logout } = useMutation(signOutAndClearStore, {
		onError: (error, variables, context) => {
			// An error happened!
			console.log(`error on signing out  `, error);
			Toast.show({
				title: "Something went wrong in signing out",
			});
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			console.log("Signned out successuly ");
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: HomeNavKey.HomeScreen }]
				}));
		},
	});

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
					<ProfileCard />

					<HStack
						space={4}
						marginTop={3}
						justifyContent="space-between"
					>
						<Box bg="white" shadow={2} rounded={10} width="45%">
							<Pressable
								onPress={() => {
									navigation.navigate(
										HomeNavKey.VisitHistory
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
							<Pressable
								onPress={() => {
									navigation.navigate(
										HomeNavKey.UpcomingAppointments
									);
								}}
							>
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
								({ icon: ActualIcon, title, onAction }, ix) => (
									<Pressable
										key={`profOpt-${ix}`}
										onPress={
											onAction !== undefined
												? () =>
														navigation.navigate(
															HomeNavKey.ChooseProfile
														)
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
}
