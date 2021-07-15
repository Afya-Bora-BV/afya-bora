import React from "react";
import { Stack, Avatar, Center } from "native-base";
import CameraIcon from "../assets/icons/Camera"
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
				<Avatar.Badge bg="white" h={10} w={10} justifyContent="center" alignItems="center">
					<CameraIcon size={5} color="#7065E4" />
				</Avatar.Badge>
			</Avatar>
		</Stack>
	);
};
