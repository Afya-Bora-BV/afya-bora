import React from "react";
import {
	Input,
	Stack,
	Center,
	NativeBaseProvider,
	Text,
	Pressable,
	HStack,
	Checkbox,
} from "native-base";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../contants/colors";
import { Alert } from "react-native";
import { useState } from "react";
import { NumberProp } from "react-native-svg";

type timeProp = {
	time: string;
};

export const TimeSet: React.FC<timeProp> = ({ time }) => {
	const [state, setState] = useState("unchecked");

	return (
		<Pressable
			onPress={() => {
				state === "checked"
					? setState("unhecked")
					: setState("checked");
			}}
		>
			<Stack
				borderColor={state === "checked" ? "transparent" : "grey"}
				borderWidth={1}
				borderRadius={10}
				height={8}
				alignItems="center"
				justifyContent="center"
				backgroundColor={
					state === "checked" ? "#2AD3E7" : "transparent"
				}
			>
				<Text color={state === "checked" ? "white" : "grey"}>
					{time}
				</Text>
			</Stack>
		</Pressable>
	);
};

export const FBLogo = () => {
	const [state, setState] = useState("unchecked");
	return (
		<Pressable
			onPress={() => {
				state === "checked"
					? setState("unhecked")
					: setState("checked");
			}}
		>
			<Stack
				borderColor={state === "checked" ? "transparent" : "grey"}
				borderWidth={1}
				borderRadius={10}
				// height={30}
				width={50}
				alignItems="center"
				justifyContent="center"
				backgroundColor={
					state === "checked" ? "#E7E5FF" : "transparent"
				}
			>
				<MaterialCommunityIcons
					name="facebook"
					size={40}
					color={state === "checked" ? colors.primary : "grey"}
				/>
			</Stack>
		</Pressable>
	);
};

type checkBoxProp = {
	item: string;
};

export const CheckBox: React.FC<checkBoxProp> = ({ item }) => {
	return (
		<Stack>
			<Checkbox value="one" my={2}>
				{item}
			</Checkbox>
		</Stack>
	);
};
