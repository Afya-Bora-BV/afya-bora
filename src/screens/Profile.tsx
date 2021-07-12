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
} from "native-base";
import { colors } from "../contants/colors";
import { Dimensions } from "react-native";
import { HeroIllustrationContainer, ProfileCard } from "../components/cards";
import AppointmentIllustration from "../assets/illustrations/AppointmentIllustration";
import OnlineConsulationIllustration from "../assets/illustrations/OnlineConsulationIllustration";
import { useNavigation } from "@react-navigation/native";
import CalendarIllustration from "../assets/illustrations/CalendarIllustration";
import NewspaperIllustration from "../assets/illustrations/NewspaperIllustration";

const Profile: React.FC = () => {
	const navigation = useNavigation();

	const { width, height } = Dimensions.get("screen");

	const nav = () => {};
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
						<Box bg="white" shadow={2} rounded="lg" width="90%">
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
						style={{
							paddingHorizontal: 20,
							paddingVertical: 10,
						}}
					>
						{/*TO DO: MOVE TO COMPONENTS FOLDER */}
						<HStack
							space={4}
							marginTop={3}
							justifyContent="space-between"
						>
							<Box bg="white" shadow={2} rounded="lg" width="45%">
								<Pressable
									onPress={() =>
										navigation.navigate("HealthRecords")
									}
								>
									<HStack
										justifyContent={"center"}
										paddingY={2}
									>
										<Stack flex={1}>
											<AppointmentIllustration
												size={60}
											/>
										</Stack>
										<Stack
											flex={1.5}
											justifyContent="center"
										>
											<Text textAlign="center">
												Health records
											</Text>
										</Stack>
									</HStack>
								</Pressable>
							</Box>

							<Box bg="white" shadow={2} rounded="lg" width="45%">
								<Pressable onPress={() => {}}>
									<HStack
										justifyContent={"center"}
										paddingY={2}
									>
										<Stack flex={1}>
											<OnlineConsulationIllustration
												size={60}
												color="red"
											/>
										</Stack>
										<Stack
											flex={1.5}
											justifyContent="center"
										>
											<Text textAlign="center">
												Consultation history
											</Text>
										</Stack>
									</HStack>
								</Pressable>
							</Box>
						</HStack>

						<HStack
							space={4}
							marginTop={3}
							justifyContent="space-between"
						>
							<Box bg="white" shadow={2} rounded="lg" width="45%">
								<Pressable onPress={() => {}}>
									<HStack
										justifyContent={"center"}
										paddingY={2}
									>
										<Stack flex={1}>
											<NewspaperIllustration size={60} />
										</Stack>
										<Stack
											flex={1.5}
											justifyContent="center"
										>
											<Text textAlign="center">
												Health monitoring
											</Text>
										</Stack>
									</HStack>
								</Pressable>
							</Box>

							<Box bg="white" shadow={2} rounded="lg" width="45%">
								<Pressable onPress={() => {}}>
									<HStack
										justifyContent={"center"}
										paddingY={2}
									>
										<Stack flex={1}>
											<CalendarIllustration size={60} />
										</Stack>
										<Stack
											flex={1.5}
											justifyContent="center"
										>
											<Text textAlign="center">
												Calendar reminder
											</Text>
										</Stack>
									</HStack>
								</Pressable>
							</Box>
						</HStack>
					</Stack>
				</Stack>
			</ScrollView>
		</Box>
	);
};

export default Profile;
