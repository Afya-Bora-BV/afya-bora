import {
	Box,
	Center,
	HStack,
	Input,
	Pressable,
	ScrollView,
	Stack,
	View,
	Square,
	VStack,
	Button,
	useToast,
} from "native-base";
import React, { useState, useCallback } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ToastAndroid } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AltContainer from "../../components/containers/AltContainer";
import { ControllerFormInput } from "../../components/forms/inputs";
import { useMutation } from "react-query";
import _ from "lodash";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { Consultant } from "../../types";
import { HomeNavKey } from "../Patient";
import { Text } from "../../components/text";
import { useAtom } from "jotai";
import { languageAtom } from "../../store/atoms";

// let render = 0

const { height } = Dimensions.get("screen");

const formEmailSchema = yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required(),
});
interface FormEmailInputs {
	email: string;
	password: string;
}

const loginWithEmailAndPassword = async ({
	email,
	password,
}: FormEmailInputs): Promise<undefined> => {
	await auth().signInWithEmailAndPassword(email, password);
	return undefined;
};

export default function LoginDoctor() {
	const Toast = useToast();
	const navigation = useNavigation();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormEmailInputs>({
		resolver: yupResolver(formEmailSchema),
	});

	const [visibility, setVisibility] = React.useState("eye-off-outline");

	const onLogin = (data: FormEmailInputs) => {
		console.log("Logging in ... ");
		login(data);
	};

	const { isLoading, mutate: login } = useMutation(
		loginWithEmailAndPassword,
		{
			onError: (error, variables, context) => {
				// An error happened!
				console.log(`rolling back optimistic update with id `, error);
				ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
			},
			onSuccess: (data: Consultant | undefined, variables, context) => {
				console.log("Logged in successfully ", data);
				ToastAndroid.show(`Successfuly logged in `, ToastAndroid.SHORT);
			},
		}
	);

	return (
		<AltContainer title="Afya Bora" backdropHeight={height / 5.5}>
			<View flexGrow={1} marginTop={10}>
				<Box
					bg="white"
					position="relative"
					shadow={2}
					rounded="xl"
					padding={5}
					marginX={5}
				>
					<VStack space={5} marginBottom={15}>
						<ControllerFormInput
							name="email"
							control={control}
							label="demo@gmail.com"
							text="common.emailAdress"
							keyboardType="email-address"
						/>
						<ControllerFormInput
							name="password"
							control={control}
							label="*************"
							text="common.password"
							keyboardType="password"
							type={
								visibility === "eye-outline"
									? "text"
									: "password"
							}
							InputRightElement={
								<Pressable
									onPress={() =>
										visibility === "eye-outline"
											? setVisibility("eye-off-outline")
											: setVisibility("eye-outline")
									}
								>
									<MaterialCommunityIcons
										name={visibility}
										size={24}
										color={colors.primary}
										style={{
											paddingEnd: 10,
										}}
									/>
								</Pressable>
							}
						/>
					</VStack>
					<Box
						position="absolute"
						bottom={-20}
						left={0}
						right={0}
						width="100%"
						paddingX={10}
					>
						<Button
							onPress={handleSubmit(onLogin)}
							isLoading={isLoading}
							isDisabled={isLoading}
							borderRadius={20}
							style={{ backgroundColor: colors.primary }}
							_text={{ color: "white" }}
							shadow={5}
						>
							<Text color="white" tx="common.login">
								{" "}
								Login{" "}
							</Text>
						</Button>
					</Box>
				</Box>
			</View>

			{/* <Stack alignItems="center" marginBottom={5}>
				<HStack space={2}>
					<Text tx="common.areYouPatient"> Are you a patient ? </Text>
					<Pressable
						focusable
						onPress={() => {
							navigation.navigate(HomeNavKey.Login);
						}}
					>
						<Text tx="common.signIn" bold color={colors.primary}>
							Sign in
						</Text>
					</Pressable>
				</HStack>
			</Stack> */}
		</AltContainer>
	);
}
