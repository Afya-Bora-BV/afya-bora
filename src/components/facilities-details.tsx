import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
	Box,
	VStack,
	HStack,
	Image,
	Text,
	Heading,
	Pressable,
	Avatar,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ClipboardPulseIcon from "../assets/icons/ClipboardPulseIcon";
import HeartPulseIcon from "../assets/icons/HeartPulseIcon";
import WalletIcon from "../assets/icons/WalletIcon";

const { width, height } = Dimensions.get("screen");

type FacilityDetailsProps = {
	facility: Facility;
};

export const FacilityDetails: React.FC<FacilityDetailsProps> = ({
	facility: { name, address, specialities },
}) => {
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
							<Heading fontSize="lg">{name} </Heading>
							<Text fontSize="md" bold color="#747F9E">
								{address}
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
									{specialities}
								</Text>
							</VStack>

							{/* TO DO : UPDATE THIS ACCORDING TO SCHEMA */}
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

							{/* TO DO : UPDATE THIS ACCORDING TO SCHEMA */}
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
