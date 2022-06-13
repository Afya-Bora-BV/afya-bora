import React from "react";
import { Stack, Avatar, Center } from "native-base";
import CameraIcon from "../assets/icons/Camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const PicAvatar = () => {
	return (
		<Stack
			direction={{
				base: "column",
				md: "row",
			}}
			space={1}
			alignItems={{
				base: "center",
				md: "flex-start",
			}}
			justifyContent="center"
			size={20}
			width="100%"
		>
			<Stack
				size={20}
				borderRadius="full"
				alignItems="center"
				justifyContent="center"
				backgroundColor="white"
				shadow={1}
			>
				<Icon name="account-plus-outline" size={42} />
			</Stack>

			{/* <Avatar
				size="xl"
				source={{
					uri: "https://organicfeeds.com/wp-content/uploads/2021/03/How-To-Raise-A-Baby-Duck-scaled-1.jpg",
				}}
			>
				SS
				<Avatar.Badge bg="white" h={10} w={10} justifyContent="center" alignItems="center">
					<CameraIcon size={5} color="#7065E4" />
				</Avatar.Badge>
			</Avatar> */}
		</Stack>
	);
};
