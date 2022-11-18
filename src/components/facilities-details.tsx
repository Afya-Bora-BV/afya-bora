import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import _ from "lodash";
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
import { Facility } from "../types";
import { friendlyNumber } from "../utils";

const { width, height } = Dimensions.get("screen");

type FacilityDetailsProps = {
	facility: Facility;
};

export const FacilityDetails: React.FC<FacilityDetailsProps> = ({
	facility: {
		name,
		city,
		street,
		country,
		photoUrl,
		specialties,
		services,
		startPrice,
		endPrice,
	},
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
								uri: photoUrl
									? photoUrl
									: "https://firebasestorage.googleapis.com/v0/b/afya-bora-fb.appspot.com/o/c2c820d8-1d2b-4a96-a947-7405156a8f41?alt=media&token=5a364ace-4e71-4b1e-a9f5-38f73b9e24fc",
							}}
						>
							Hospital
						</Avatar>
					</VStack>
					<VStack space={5}>
						<VStack space={1}>
							<Heading fontSize="lg">{name} </Heading>
							<Text fontSize="md" bold color="#747F9E">
								{street}
							</Text>
							<Text fontSize="md" bold color="#747F9E">
								{city}
							</Text>
							<Text fontSize="md" bold color="#747F9E">
								{country}
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
									{(specialties || [])
										.map(_.upperFirst)
										.join(", ")}
										{/* {JSON.stringify(specialties)} */}
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
									{/*Imaging, medical investigations, primary*/}
									{/*care services, cancer treatment*/}
									{(services || [])
										.map(_.upperFirst)
										.join(", ")}
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
									Tsh {friendlyNumber(startPrice || 5000)} -
									Tsh {friendlyNumber(endPrice || 400000)} /=
								</Text>
							</VStack>
						</VStack>
					</VStack>
				</VStack>
			</VStack>
		</Box>
	);
};
