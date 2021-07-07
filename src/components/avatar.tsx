import React from "react";
import { Stack, Avatar } from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../contants/colors";
import { Alert } from "react-native";
import { useState } from "react";

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
		>
			<Avatar
				size="xl"
				source={{
					uri: "https://organicfeeds.com/wp-content/uploads/2021/03/How-To-Raise-A-Baby-Duck-scaled-1.jpg",
				}}
			>
				SS
			</Avatar>
		</Stack>
	);
};
