import React from "react";
import {
	Box,
	Center,
	Heading,
	ScrollView,
	Stack,
	StatusBar,
	View,
	Text,
	HStack,
	Pressable,
	Spacer,
	Icon,
} from "native-base";
import { colors } from "../contants/colors";
import { Dimensions } from "react-native";
import { HeroIllustrationContainer, ProfileCard } from "../components/cards";
import AppointmentIllustration from "../assets/illustrations/AppointmentIllustration";
import OnlineConsulationIllustration from "../assets/illustrations/OnlineConsulationIllustration";
import { useNavigation } from "@react-navigation/native";
import CalendarIllustration from "../assets/illustrations/CalendarIllustration";
import NewspaperIllustration from "../assets/illustrations/NewspaperIllustration";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AccountIcon from "../assets/icons/AccountIcon";
import UpdateClock from "../assets/icons/UpdateClock";
import MapPinIcon from "../assets/icons/MapPinIcon";
import CardIcon from "../assets/icons/CardIcon";
import HeadphoneIcon from "../assets/icons/HeadphoneIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";
import InfoIcon from "../assets/icons/InfoIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";

const ProfileMain: React.FC = () => {
	const navigation = useNavigation();

	const { width, height } = Dimensions.get("screen");

	const nav = () => {
		return (
			<View>
				<View alignItems="center" paddingY={20}>
					<Text color="white" fontSize={35}>
						Profile
					</Text>
				</View>

				<Stack alignItems="center">
					<Box bg="white" shadow={2} rounded={10} width="90%">
						<Stack
							style={{
								paddingHorizontal: 5,
								paddingVertical: 10,
							}}
						>
							<ProfileCard
								name={"Ally Salim"}
								number={"077777777"}
								press={nav}
							/>
						</Stack>
					</Box>
				</Stack>
			</View>
		);
	};
	return (
		<Box flex={1}>
			{/* <StatusBar barStyle="dark-content" backgroundColor={"#fff"} /> */}
			<ScrollView>
				<Stack
					backgroundColor={colors.primary}
					borderBottomRadius={36}
					height={height / 3.5}
					position="absolute"
					top={0}
					left={0}
					right={0}
				></Stack>
				<Stack paddingBottom={10}>
					<View alignItems="center" paddingY={20}>
						<Text color="white" fontSize={35}>
							Profile
						</Text>
					</View>

					<Stack alignItems="center">
						<Box bg="white" shadow={2} rounded={10} width="90%">
							<Stack
								style={{
									paddingHorizontal: 5,
									paddingVertical: 10,
								}}
							>
								<ProfileCard
									name={"Ally Salim"}
									number={"077777777"}
									press={nav}
								/>
							</Stack>
						</Box>
					</Stack>

					<Stack
						// visibility="hidden"
						style={{
							alignItems: "center",
							paddingHorizontal: 5,
							paddingVertical: 10,
						}}
					>
						{/*TO DO: MOVE TO COMPONENTS FOLDER */}

						<Box bg="white" shadow={2} rounded={10} width="90%">
							<Stack paddingX={5} paddingY={3}>
								<Pressable
									onPress={() =>
										navigation.navigate("Profile")
									}
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<AccountIcon />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text fontSize={18}>Profile</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />

								<Pressable
								// onPress={() => navigation.navigate("Profile")}
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<UpdateClock />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text fontSize={18}>
												Q & A History
											</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />

								<Pressable
								// onPress={() => navigation.navigate("")}
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<MapPinIcon />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text fontSize={18}>Address</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />

								<Pressable
								// onPress={() =>
								// 	navigation.navigate("Profile")
								// }
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<CardIcon />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text fontSize={18}>
												Payment Method
											</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />

								<Pressable
								// onPress={() =>
								// 	navigation.navigate("Profile")
								// }
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<HeadphoneIcon />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text fontSize={18}>
												Help Center
											</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />

								<Pressable
								// onPress={() =>
								// 	navigation.navigate("Profile")
								// }
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<PhoneIcon />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text fontSize={18}>Hotline</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />

								<Pressable
									onPress={() =>
										navigation.navigate("Profile")
									}
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<InfoIcon />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text fontSize={18}>About Us</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />

								<Pressable
									onPress={() =>
										navigation.navigate("Profile")
									}
								>
									<HStack alignItems="center">
										<Stack flex={0.5}>
											<Icon>
												<LogoutIcon />
											</Icon>
										</Stack>
										<Stack flex={3}>
											<Text
												style={{ color: "red" }}
												fontSize={18}
											>
												Logout
											</Text>
										</Stack>
									</HStack>
								</Pressable>

								<Spacer size={5} />
							</Stack>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>
		</Box>
	);
};

export default ProfileMain;
