import React from "react";
import { Stack, Avatar } from "native-base";

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
