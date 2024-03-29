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
import _ from "lodash";
import DoctorIcon from "../assets/icons/DoctorIcon"
import { colors } from "../constants/colors";

type ConsultantListItemProps = {
	consultant: Consultant;
};

export const ConsultantListItem: React.FC<ConsultantListItemProps> = ({
	consultant: {
		name,
		facilityId,
		email,
		specialities,
		specialties

	},
}) => {
	return (
		<Box bg="white" shadow={2} rounded={10} testID="ConsultantListItem">
			<Text
				px={4}
				py={2}
				fontSize={"md"}
				fontWeight="medium"
				color={colors.primary}
			>Consultant</Text>
			<VStack
				px={4}
				py={2}
				borderRadius={12}
				style={{ backgroundColor: "white" }}
			>
				<HStack>

					{/* <FastImage
						style={{ width: 120, height: 120, borderRadius: 6 }}
						source={{
							uri: "https://wallpaperaccess.com/full/317501.jpg",
							// headers: { Authorization: 'someAuthToken' },
							priority: FastImage.priority.normal,
						}}
						resizeMode={FastImage.resizeMode.cover}
					/> */}

					<DoctorIcon color={colors.primary} size={64} />
					<VStack style={{}} pl={4} flex={1}>
						<HStack
							justifyContent="space-between"
							alignItems="center"
						>
							<Heading fontSize="md" bold>{name} </Heading>
						</HStack>
						<VStack>
							<Text fontSize="md" color="#747F9E">
								<MaterialCommunityIcons
									name="clipboard-pulse-outline"
									size={16}
								/>
								{_.startCase(_.toLower(specialties.join(" , ")))}
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
						{/* 
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
						</HStack> */}
					</VStack>
				</HStack>
			</VStack>
		</Box>
	);
};
