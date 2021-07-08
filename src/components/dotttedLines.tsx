import React from "react";
import { Image, View } from "react-native";

export const Dots = () => {
	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "red",
				flexWrap: "wrap",
				justifyContent: "center",
			}}
		>
			<Image
				style={{
					resizeMode: "repeat",
					justifyContent: "center",
					flex: 1,
				}}
				source={require("../images/dots.png")}
			/>
		</View>
	);
};
