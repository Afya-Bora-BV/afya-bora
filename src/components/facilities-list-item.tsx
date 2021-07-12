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
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type FacilityListItemProps = {
	facility: {
		name: string;
		street: string;
		region: string;
		rating: number;
		ratedBy: number;
		distance: string;
	};
	onPress: () => void;
};

export const FacilityListItem: React.FC<FacilityListItemProps> = ({
	facility: { name, street, region, rating, ratedBy, distance },
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
						<Avatar
							alignSelf="flex-start"
							size={120}
							borderRadius={6}
							source={{
								uri: "https://wallpaperaccess.com/full/317501.jpg",
							}}
						>
							SS
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
									{street + ", " + region}
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
										name="google-maps"
										size={18}
										color="#258FBE"
									/>
									<Text color="#258FBE">{distance}</Text>
								</HStack>
							</HStack>
						</VStack>
					</HStack>
				</VStack>
			</TouchableOpacity>
		</Box>
	);
};