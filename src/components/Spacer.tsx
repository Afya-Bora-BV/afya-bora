import React from "react";
import { View } from "react-native";

type SpacerProps = {
	size: number;
	horizontal?: boolean;
};

const Spacer: React.FC<SpacerProps> = ({ size, horizontal }) => {
	return (
		<View
			testID="Spacer"
			style={[
				horizontal
					? {
						width: size,
					}
					: {
						height: size,
					},
			]}
		/>
	);
};

export { Spacer };
