import { useRoute } from "@react-navigation/native";
import {
	Text,
	Avatar,
	Box,
	Heading,
	HStack,
	VStack,
	Pressable,
	Stack,
} from "native-base";
import React from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ClipboardPulseIcon from "../../../assets/icons/ClipboardPulseIcon";
import HeartPulseIcon from "../../../assets/icons/HeartPulseIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import MainContainer from "../../../components/containers/MainContainer";
import { Spacer } from "../../../components/Spacer";
import { IconContainer } from "../../../components/misc";
import BackIcon from "../../../assets/icons/BackIcon";
import { PrimaryButton } from "../../../components/button";

export interface Consultant {
	id: string;
	name: string;
	gender: "male" | "female";
	facility?: { name: string; address: string };
	clinicianType: string;
	specialities: string[];
	rating: number;
	ratedBy: number;
	status?: "offline" | "online";
}

type ConsultantListItemProps = {
	consultant: Consultant;
	onPress: () => void;
};

const { width, height } = Dimensions.get("screen");

const FacilityInfo: React.FC = () => {
	return (
		<MainContainer
			title={"Selected Facility"}
			leftSection={() => (
				<IconContainer>
					<BackIcon size={6} color="#561BB3" />
				</IconContainer>
			)}
		>
			<ScrollView>
				<Stack p={5}>
					<FacilityComponent />
				</Stack>

				<Stack px={10}>
					<PrimaryButton onPress={() => {

					}}>
						Schedule Appointment
					</PrimaryButton>
				</Stack>
			</ScrollView>
		</MainContainer>
	);
};

const FacilityComponent: React.FC = () => {
	const route = useRoute();

	// TODO : considering not passing object in navigation object
	// use Atoms instead to pass info between screen
	const { facility } = route?.params;


	return (
		<Box bg="white" shadow={2} rounded={10} testID="ConsultantListItem">
			<VStack p={4} borderRadius={12} bg={"white"} space={5}>
				<VStack space={5}>
					<VStack alignItems="center" justifyContent="center">
						<Avatar
							width={width / 1.2}
							height={120}
							borderRadius={6}
							source={{
								uri: "https://wallpaperaccess.com/full/317501.jpg",
							}}
						>
							SS
						</Avatar>
					</VStack>
					<VStack space={5}>
						<VStack space={1}>
							<Heading fontSize="lg">{facility.name} </Heading>
							<Text fontSize="md" bold color="#747F9E">
								{facility.address}
							</Text>
						</VStack>

						<VStack space={5}>
							<VStack>
								<HStack alignItems={"center"} space={2}>
									<VStack>
										<ClipboardPulseIcon size={5} />
									</VStack>

									<VStack>
										<Text bold fontSize="md">
											Specialities
										</Text>
									</VStack>
								</HStack>
								<Text pl={7} color={"#747F9E"}>
									{facility.specialities}
								</Text>
							</VStack>

							<VStack>
								<HStack alignItems={"center"} space={2}>
									<VStack>
										<HeartPulseIcon size={5} />
									</VStack>

									<VStack>
										<Text bold fontSize="md">
											Services
										</Text>
									</VStack>
								</HStack>
								<Text pl={7} color={"#747F9E"}>
									Imaging, medical investigations, primary
									care services, cancer treatment
								</Text>
							</VStack>

							<VStack>
								<HStack alignItems={"center"} space={2}>
									<VStack>
										<WalletIcon size={5} />
									</VStack>

									<VStack>
										<Text bold fontSize="md">
											Price Range
										</Text>
									</VStack>
								</HStack>
								<Text color={"#747F9E"} pl={7}>
									Tsh 5,000 - Tsh 400,000
								</Text>
							</VStack>
						</VStack>
					</VStack>
				</VStack>
			</VStack>
		</Box>
	);
};

export default FacilityInfo;
