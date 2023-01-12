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
			size={40}
			width="100%"
		>
			<Stack
				size={40}
				borderRadius="full"
				alignItems="center"
				justifyContent="center"
				backgroundColor="white"
				shadow={1}
				p={6}
			>
				<Icon name="account-plus-outline" size={42} />
			</Stack>
		</Stack>
	);
};
