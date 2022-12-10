import React from "react";
import { TouchableOpacity } from "react-native";
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
import { Consultant } from "../types";
import FastImage from "react-native-fast-image";


type ConsultantListItemProps = {
	consultant: Consultant;
};

export const ConsultantListItem: React.FC<ConsultantListItemProps> = ({
	consultant: {
		name,
		facilityId,
		email,
		specialities

	},
}) => {
	return (
		<Box bg="white" shadow={2} rounded={10} testID="ConsultantListItem">
			<Text fontSize={"2xl"} px={5} py={2}>Consultant</Text>
			<VStack
				p={4}
				borderRadius={12}
				style={{ backgroundColor: "white" }}
			>
				<HStack alignItems="center">
					{/* <Avatar
						alignSelf="flex-start"
						size={120}
						borderRadius={6}
						source={{
							uri: "https://wallpaperaccess.com/full/317501.jpg",
						}}
					>
						SS

					</Avatar> */}
					<FastImage
						style={{ width: 120, height: 120, borderRadius: 6 }}
						source={{
							uri: "https://wallpaperaccess.com/full/317501.jpg",
							// headers: { Authorization: 'someAuthToken' },
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
					/>
					<VStack style={{}} pl={3} flex={1}>
						<HStack
							justifyContent="space-between"
							alignItems="center"
						>
							<Heading fontSize="lg">{name} </Heading>
						</HStack>
						<VStack>
							<Text fontSize="md" bold color="#747F9E">
								{email}
							</Text>
							<Text fontSize="md" color="#747F9E">
								<MaterialCommunityIcons
									name="google-maps"
									size={16}
								/>
								{facilityId}
							</Text>
							{/* <Text fontSize="md" color="#747F9E">
								<MaterialCommunityIcons
									name="clipboard-pulse-outline"
									size={16}
								/>
								{specialities.join(" , ") + ", "}
							</Text> */}
						</VStack>

						<HStack
							space={1}
							justifyContent="space-between"
							marginTop={2}
						>
							<HStack space={1} alignItems="center">
								<MaterialCommunityIcons
									name="star"
									color="#FFC107"
									size={24}
								/>
								<Text fontSize="md" color="#B0B3C7">
									{0} ({0})
								</Text>
							</HStack>
							<HStack
								space={1}
								px={2}
								py={1}
								borderRadius={4}
								justifyContent="center"
								alignItems="center"
								style={{
									backgroundColor: "rgba(37,143,190,0.2)",
								}}
							>
								<MaterialCommunityIcons
									name="clock-time-seven-outline"
									size={18}
									color="#258FBE"
								/>
								<Text color="#258FBE">{" "}</Text>
							</HStack>
						</HStack>
					</VStack>
				</HStack>
			</VStack>
		</Box>
	);
};
