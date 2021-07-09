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
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type ConsultantListItemProps = {
	consultant: {
		name: string;
		hospital: string;
		region: string;
		expertise: string;
		rating: number;
		ratedBy: number;
		time: string;
	};
	onPress: () => void;
};

export const ConsultantListItem: React.FC<ConsultantListItemProps> = ({
	consultant: { name, hospital, region, expertise, rating, ratedBy, time },
	onPress,
}) => {
	return (
		<Box bg="white" shadow={2} rounded="lg">
			<TouchableOpacity onPress={onPress}>
				<VStack
					p={4}
					borderRadius={12}
					style={{ backgroundColor: "white" }}
				>
					<HStack alignItems="center">
						<Image
							// size={100}
							width={"35%"}
							height={"100%"}
							alt="fallback text"
							borderRadius={6}
							source={{
								uri: "https://wallpaperaccess.com/full/317501.jpg",
							}}
							fallbackSource={{
								uri: "https://www.w3schools.com/css/img_lights.jpg",
							}}
						/>
						{/* height to be fixed to auto */}
						<VStack style={{}} pl={3} flex={1}>
							<HStack
								justifyContent="space-between"
								alignItems="center"
							>
								<Heading fontSize="lg">{name} </Heading>
							</HStack>
							<VStack>
								<Text fontSize="md" bold color="#747F9E">
									{hospital}
								</Text>
								<Text fontSize="md" color="#747F9E">
									<MaterialCommunityIcons
										name="google-maps"
										size={16}
									/>
									{region}
								</Text>
								<Text fontSize="md" color="#747F9E">
									<MaterialCommunityIcons
										name="clipboard-pulse-outline"
										size={16}
									/>
									{expertise}
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
									style={{ backgroundColor: "#D4FAFF" }}
								>
									<MaterialCommunityIcons
										name="clock-time-seven-outline"
										size={18}
										color="#2AD3E7"
									/>
									<Text color="#2AD3E7">{time}</Text>
								</HStack>
							</HStack>
						</VStack>
					</HStack>
				</VStack>
			</TouchableOpacity>
		</Box>
	);
};