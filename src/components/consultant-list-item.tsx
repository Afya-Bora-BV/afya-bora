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

export interface Consultant {
	id: string
	name: string
	gender: "male" | "female",
	facility?: { name: string, address: string },
	clinicianType: string,
	specialities: string[],
	rating: number,
	ratedBy: number
	status?: "offline" | "online"
}

type ConsultantListItemProps = {
	consultant: Consultant;
	onPress: () => void;
};


export const ConsultantListItem: React.FC<ConsultantListItemProps> = ({
	consultant: {
		name,
		facility,
		specialities,
		rating,
		ratedBy,
		status
	},
	onPress,
}) => {
	return (
		<Box bg="white" shadow={2} rounded={10} testID="ConsultantListItem">
			<TouchableOpacity onPress={onPress}>
				<VStack
					p={4}
					borderRadius={12}
					style={{ backgroundColor: "white" }}
				>
					<HStack alignItems="center">
						<Avatar
							alignSelf="flex-start"
							size={120}
							borderRadius={6}
							source={{
								uri: "https://wallpaperaccess.com/full/317501.jpg",
							}}
						>
							SS
							{Boolean(status) ? (
								<Avatar.Badge
									backgroundColor={
										status === "online"
											? "#24D626"
											: "#B0B3C7"
									}
									w={4}
									h={4}
									top={1}
									right={1}
								/>
							) : (
								<Avatar.Badge
									backgroundColor="transparent"
									borderColor="transparent"
									w={4}
									h={4}
									top={1}
									right={1}
								/>
							)}
						</Avatar>
						<VStack style={{}} pl={3} flex={1}>
							<HStack
								justifyContent="space-between"
								alignItems="center"
							>
								<Heading fontSize="lg">{name} </Heading>
							</HStack>
							<VStack>
								<Text fontSize="md" bold color="#747F9E">
									{facility?.name}
								</Text>
								<Text fontSize="md" color="#747F9E">
									<MaterialCommunityIcons
										name="google-maps"
										size={16}
									/>
									{facility?.address}
								</Text>
								<Text fontSize="md" color="#747F9E">
									<MaterialCommunityIcons
										name="clipboard-pulse-outline"
										size={16}
									/>
									{specialities + ", "}
								</Text>
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
										{rating} ({ratedBy})
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
			</TouchableOpacity>
		</Box>
	);
};
