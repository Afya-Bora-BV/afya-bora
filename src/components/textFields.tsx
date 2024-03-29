import React from "react";
import {
	Input,
	Stack,
	Center,
	NativeBaseProvider,
	Text,
	Pressable,
	HStack,
	IInputProps,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../constants/colors";
import { Alert } from "react-native";
import { useState } from "react";
import { Spacer } from "./Spacer";

type inputProp = {
	holderText: string;
} & IInputProps;

export const TextInput: React.FC<inputProp> = ({ holderText, ...rest }) => {
	return (
		<Stack>
			<Text>{holderText}</Text>
			<Spacer size={10} />
			<Input variant="rounded" placeholder={holderText} {...rest} />
		</Stack>
	);
};

export const SearchBar = () => {
	return (
		<Stack>
			<Input
				backgroundColor="#F8F8F8"
				variant="rounded"
				placeholder={"Search"}
				InputRightElement={
					<Pressable
						onPress={() => {
							Alert.alert("Search Pressed");
						}}
					>
						<Icon
							name="magnify"
							size={24}
							color={colors.primary}
							style={{ paddingEnd: 10 }}
						/>
					</Pressable>
				}
			/>
		</Stack>
	);
};

export const DropDown: React.FC<inputProp> = ({ holderText }) => {
	return (
		<Stack>
			<Text>{holderText}</Text>
			<Input
				variant="rounded"
				placeholder={holderText}
				InputRightElement={
					<Pressable onPress={() => Alert.alert("Arrow clicked")}>
						<Icon
							name="chevron-down"
							size={24}
							color={colors.primary}
							style={{ paddingEnd: 10 }}
						/>
					</Pressable>
				}
			/>
		</Stack>
	);
};

export const Location: React.FC<inputProp> = ({ holderText }) => {
	const [state, setState] = useState("unchecked");

	return (
		<Pressable
			onPress={() => {
				state === "checked"
					? setState("unhecked")
					: setState("checked");
			}}
		>
			<HStack>
				<Stack flex={0.5}>
					<Icon
						name="map-marker-outline"
						size={24}
						color={state === "checked" ? "black" : "grey"}
						style={{ paddingEnd: 10 }}
					/>
				</Stack>

				<Stack flex={1} alignSelf="flex-start">
					<Text color={state === "checked" ? "black" : "grey"}>
						{holderText}
					</Text>
				</Stack>

				<Stack flex={3} alignItems="flex-end">
					<Icon
						name="check"
						size={24}
						color={state === "checked" ? "black" : "transparent"}
						style={{ paddingEnd: 10 }}
					/>
				</Stack>
			</HStack>
		</Pressable>
	);
};

type numberProp = {
	number: number;
};

export const Number: React.FC<numberProp> = () => {
	return (
		<Stack>
			<Input
				size="xl"
				variant="outline"
				keyboardType={"number-pad"}
				maxLength={1}
			/>
		</Stack>
	);
};
