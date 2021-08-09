import React from "react";
import { Button, Stack, Icon, View } from "native-base";
import { colors } from "../constants/colors";
import { IButtonComponentType } from "native-base/lib/typescript/components/primitives/Button/types";

type buttonProps = IButtonComponentType & {
	text: string;
	onPress: () => void;
};

export const PrimaryButton: React.FC<buttonProps> = ({
	children,
	onPress,
	...rest
}) => {
	return (
		<Button
			onPress={onPress}
			borderRadius={20}
			_disabled={{
				backgroundColor: "#B0B3C7",
				color: "white",
			}}
			style={{ backgroundColor: colors.primary }}
			_text={{ color: "white" }}
			{...rest}
		>
			{children}
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
