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
import { Facility } from "../types";
import FastImage from "react-native-fast-image";

type FacilityListItemProps = {
	facility: Facility;
	fid: string
};

// TODO: calcultae distance from geopoint and render distance
const getDistance = (geopoint: { lat: number; lng: number }) => {
	return `${0} km`;
};

export const FacilityListItem: React.FC<FacilityListItemProps> = ({
	facility,
}) => {
	return (
		<Box bg="white" shadow={1} rounded={10}>
			<VStack
				p={4}
				borderRadius={12}
				style={{ backgroundColor: "white" }}
			>
				<HStack alignItems="center">
					<FastImage
						style={{ width: 120, height: 120, borderRadius: 6 }}
						source={{
							uri: facility?.photoUrl
								? facility?.photoUrl
								: "https://firebasestorage.googleapis.com/v0/b/afya-bora-fb.appspot.com/o/c2c820d8-1d2b-4a96-a947-7405156a8f41?alt=media&token=5a364ace-4e71-4b1e-a9f5-38f73b9e24fc",
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
							<Heading fontSize="lg">{facility?.name} </Heading>
							{/* <Heading fontSize="lg">{fid} </Heading> */}
						</HStack>
						<VStack>
							{/* TODO: specialties information to be pushed to the view facility page */}
							{/* <Text fontSize="md" bold color="#747F9E">
								{specialties}
							</Text> */}
							<Text fontSize="md" color="#747F9E">
								{facility?.city}
							</Text>
							<Text fontSize="md" color="#747F9E">
								{facility?.country}
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
									0
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
								<Text color="#258FBE">{0}</Text>
							</HStack>
						</HStack>
					</VStack>
				</HStack>
			</VStack>
		</Box>
	);
};
