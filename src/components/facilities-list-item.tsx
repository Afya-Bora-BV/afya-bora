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

type FacilityListItemProps = {
	facility: Facility
	onPress: () => void;
};

// TODO: calcultae distance from geopoint and render distance
const getDistance = (geopoint: { lat: number, lng: number }) => {
	return `${0} km`
}

export const FacilityListItem: React.FC<FacilityListItemProps> = ({
	facility: { name, address, rating: { count, stars }, geopoint },
	onPress,
}) => {
	return (
		<Box bg="white" shadow={2} rounded={10}>
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
									{address}
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
										{stars} ({count})
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
									<Text color="#258FBE">{getDistance(geopoint)}</Text>
								</HStack>
							</HStack>
						</VStack>
					</HStack>
				</VStack>
			</TouchableOpacity>
		</Box>
	);
};
