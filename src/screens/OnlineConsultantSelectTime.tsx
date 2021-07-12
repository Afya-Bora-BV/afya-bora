import React from "react";
import {
	Box,
	VStack,
	Text,
	Heading,
	StatusBar,
	ScrollView,
	HStack,
	Button,
} from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { colors } from "../contants/colors";
import { HeaderwithBack } from "../components/header";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";

const FindFacility: React.FC = () => {
	const { goBack, navigate } = useNavigation();
	React.useEffect(() => {
		console.log("Mounted");
	}, []);

	const goNext = () => navigate("OnlineConsultantSelectConsultant");

	return (
		<VStack flex={1} py={8} px={4} position="relative">
			<VStack space={4}>
				<HeaderwithBack
					text="Day and Time"
					onBackPress={() => goBack()}
				/>
				<VStack>
					<Box bg="white" p={2} shadow={2} rounded="lg" mb={1}>
						<VStack p={1} space={10}>
							<HStack justifyContent="space-between">
								<Text fontSize="2xl" bold>
									Pick a Date
								</Text>

								<HStack alignItems="center">
									<Text>September 2021</Text>
									<MaterialCommunityIcons
										size={18}
										name="chevron-down"
									/>
								</HStack>
							</HStack>
							<ScrollView
								snapToInterval={2}
								horizontal
								paddingBottom={3}
							>
								<HStack space={1}>
									{_.times(31, (n) => (
										<CalendarDay
											key={n}
											date={new Date()}
										/>
									))}
								</HStack>
							</ScrollView>

							<HStack justifyContent="space-between">
								<Text fontSize="2xl" bold>
									Pick a Time
								</Text>

								<HStack alignItems="center">
									<Text>September 2021</Text>
									<MaterialCommunityIcons
										size={18}
										name="chevron-down"
									/>
								</HStack>
							</HStack>

							<VStack space="sm" mt={4}>
								{_.times(3, (n) => {
									const t = n + 6;
									return (
										<HStack flexWrap="wrap" space="md">
											<TouchableOpacity
												style={{ flex: 1 }}
											>
												<Box
													borderWidth={1}
													borderColor="#ccc"
													rounded="lg"
													alignItems="center"
													p={2}
												>
													<Text>
														{_.padStart(
															t + "",
															2,
															"0"
														)}
														:00{" "}
														{t > 11 ? "PM" : "AM"}
													</Text>
												</Box>
											</TouchableOpacity>
											<TouchableOpacity
												style={{ flex: 1 }}
											>
												<Box
													borderWidth={1}
													borderColor="#ccc"
													rounded="lg"
													alignItems="center"
													p={2}
												>
													<Text>
														{_.padStart(
															t + "",
															2,
															"0"
														)}
														:30{" "}
														{t > 11 ? "PM" : "AM"}
													</Text>
												</Box>
											</TouchableOpacity>
										</HStack>
									);
								})}
							</VStack>
						</VStack>
					</Box>
				</VStack>
			</VStack>
			<VStack position="absolute" bottom={4} w={295} alignSelf="center">
				<Button bgColor={colors.primary} onPress={goNext}>
					Next
				</Button>
			</VStack>
		</VStack>
	);
};

type CalendarDayProps = {
	date: Date;
};

const CalendarDay: React.FC<CalendarDayProps> = ({ date }) => (
	<TouchableOpacity>
		<Box
			bg="#fff"
			borderWidth={1}
			borderColor="#ccc"
			p={3}
			rounded="xl"
			alignItems="center"
		>
			<Text>Mon</Text>
			<Text>09/09</Text>
		</Box>
	</TouchableOpacity>
);

export default FindFacility;
