import React from "react";
import { Button, Stack, Icon } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors } from "../contants/colors";

type buttonProps = {
	text: string;
	press: () => {};
};

export const PrimaryButton: React.FC<buttonProps> = ({ text, press }) => {
	return (
		<Button
			onPress={press}
			testID="button1"
			borderRadius={20}
			_disabled={{
				backgroundColor: "#B0B3C7",
				color: "white",
			}}
			style={{ backgroundColor: colors.primary }}
			_text={{ color: "white" }}
		>
			{text}
		</Button>
	);
};
export const OutLineButton = () => (
	<Button
		testID={"button2"}
		variant="outline"
		borderRadius={20}
		style={{ borderColor: colors.primary }}
		_text={{ color: colors.primary }}
	>
		Button
	</Button>
);

export const SecondaryButton = () => {
	return (
		<Button
			testID={"button3"}
			borderRadius={20}
			style={{ backgroundColor: "#E7E5FF" }}
			_text={{ color: colors.primary }}
		>
			New profile
		</Button>
	);
};
export default () => {
	return (
		<Stack space={4} testID="button">
			<PrimaryButton />
			<OutLineButton />
			<SecondaryButton />
		</Stack>
	);
};
