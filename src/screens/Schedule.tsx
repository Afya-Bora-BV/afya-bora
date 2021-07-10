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
	Icon,
	VStack,
} from "native-base";
import { colors } from "../contants/colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Pressable } from "react-native";
import UpdateClock from "../assets/icons/UpdateClock";
import Card_PurpleIcon from "../assets/icons/Card_PurpleIcon";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Card_RedIcon from "../assets/icons/Card_RedIcon";
import SquareCheckIcon from "../assets/icons/SquareCheckIcon";

const Schedule: React.FC = () => {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");
	return (
		<Box flex={1} marginTop={4}>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
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
						<HStack paddingX={5}>
							<Stack flex={2.2} alignItems="flex-end">
								<Text color="white" fontSize={35}>
									Schedule
								</Text>
							</Stack>

							<Stack
								justifyContent="center"
								alignItems="flex-end"
								flex={1}
							>
								<Pressable>
									<Icon>
										<UpdateClock />
									</Icon>
								</Pressable>
							</Stack>
						</HStack>
					</View>

					<Stack alignItems="center">
						<Box bg="white" shadow={2} rounded="lg" width="90%">
							<Stack
								style={{
									paddingHorizontal: 5,
									paddingVertical: 10,
								}}
							>
								{/* TO DO - MOVE TO COMPONENTS FOLDER */}
								<HStack justifyContent="space-between">
									<VStack flex={1} alignItems="center">
										<Pressable>
											<Icon size={90}>
												<Card_PurpleIcon size={20} />
											</Icon>
											<Text color={"#7065E4"} bold>
												Wait for pay
											</Text>
										</Pressable>
									</VStack>

									<VStack flex={1} alignItems="center">
										<Pressable>
											<Stack>
												<Icon
													alignSelf="center"
													size={90}
												>
													<Card_RedIcon size={20} />
												</Icon>
											</Stack>
											<Text
												alignSelf="center"
												color={"grey"}
												bold
											>
												Endocrine
											</Text>
										</Pressable>
									</VStack>

									<VStack flex={1} alignItems="center">
										<Pressable>
											<Icon size={90}>
												<SquareCheckIcon size={20} />
											</Icon>
											<Text
												alignSelf="center"
												color={"grey"}
												bold
											>
												Dentist
											</Text>
										</Pressable>
									</VStack>
								</HStack>
							</Stack>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>
		</Box>
	);
};

export default Schedule;
