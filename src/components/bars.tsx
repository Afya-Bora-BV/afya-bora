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
import { colors } from "../constants/colors";
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
		testID={"TimeSet"}
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
		testID="FBLogo"
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
				{/* <MaterialCommunityIcons
					name="facebook"
					size={40}
					color={state === "checked" ? colors.primary : "grey"}
				/> */}
			</Stack>
		</Pressable>
	);
};

type checkBoxProp = {
	item: string;
};

export const CheckBox: React.FC<checkBoxProp> = ({ item }) => {
	return (
		<Stack testID="CheckBox">
			<Checkbox value="one" my={2}>
				{item}
			</Checkbox>
		</Stack>
	);
};

type symptomProp = {
	symptom: string;
};

export const Symptom: React.FC<symptomProp> = ({ symptom }) => {
	const [state, setState] = useState("unchecked");

	return (
		<Pressable
		testID={"Symptom"}
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
					{symptom}
				</Text>
			</Stack>
		</Pressable>
	);
};
