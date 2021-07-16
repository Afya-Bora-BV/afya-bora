import { useNavigation } from "@react-navigation/native";
import {
	Box,
	HStack,
	ScrollView,
	Stack,
	StatusBar,
	VStack,
	Text,
} from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { PrimaryButton } from "../components/button";
import { ProfileCard } from "../components/cards";
import { HeaderWith2Icons } from "../components/header";
import { colors } from "../contants/colors";

export const HealthRecords = () => {
	const nav = () => {
		navigation.navigate("CreateProfile");
	};
	const back = () => {
		navigation.navigate("Profile");
	};
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");
	return (
		<Box flex={1} marginTop={4}>
			{/* <StatusBar translucent backgroundColor={colors.primary} /> */}
			<ScrollView>
				<Stack
					backgroundColor={colors.primary}
					borderBottomRadius={36}
					height={height / 4.5}
					position="absolute"
					top={0}
					left={0}
					right={0}
				></Stack>
				<Stack padding={5}>
					<Stack>
						<HeaderWith2Icons
							text={"Health Records"}
							iconPress={back}
							rPress={nav}
						/>
					</Stack>
					<Stack alignItems="center" paddingTop={20}>
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

					{/* TO DO - MOVE TO COMPONENTS FOLDER */}
					<Stack paddingX={5} paddingY={10}>
						<Box bg="white" shadow={2} rounded={10} width="100%">
							<HStack
								justifyContent="space-between"
								paddingTop={5}
								paddingBottom={10}
							>
								<VStack
									justifyContent="center"
									alignItems="center"
									flex={1}
								>
									<Text color="grey">Weight</Text>
									<HStack>
										<Text bold>48 </Text>
										<Text>kg</Text>
									</HStack>
								</VStack>

								<VStack
									justifyContent="center"
									alignItems="center"
									flex={1}
								>
									<Text color="grey">Height</Text>
									<HStack>
										<Text bold>1,65 </Text>
										<Text>cm</Text>
									</HStack>
								</VStack>

								<VStack
									justifyContent="center"
									alignItems="center"
									flex={1}
								>
									<Text color="grey">Blood group</Text>
									<HStack>
										<Text bold>O </Text>
									</HStack>
								</VStack>
							</HStack>
							<Box mb={-6} paddingX={"5%"}>
								<PrimaryButton
									text={"New profile"}
									shadow={5}
									onPress={nav}
								/>
							</Box>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>
		</Box>
	);
};
