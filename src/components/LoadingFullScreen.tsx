import React from "react";
import { View } from "react-native";
import Spinner from "react-native-spinkit";
import { colors } from "../constants/colors";
import { Text } from "native-base";

export const LoaderItem = ({ size = 72 }) => (
	<Spinner isVisible={true} size={72} type={"Pulse"} color={colors.primary} />
);

export const LoadingFullScreen = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
			}}
		>
			<LoaderItem />
			<Text>Please wait...</Text>
		</View>
	);
};
