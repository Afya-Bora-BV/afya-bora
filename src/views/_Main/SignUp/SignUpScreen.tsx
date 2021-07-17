import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, VStack, View, Pressable, Stack, Text, useToast } from "native-base";
import { PrimaryButton } from "../../../components/button";
import { colors } from "../../../constants/colors";


import { NavKey as SignUpNavKey } from './_navigator'
import { NavKey as PlainNavKey } from '../_navigator'
import AltContainer from "../../../components/containers/AltContainer";
import { Dimensions } from "react-native";
import { ControllerFormInput } from "../../../components/forms/inputs";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "../../../internals/auth/context";

interface SignUpFormInput {
	phoneNumber: string;
}

const schema = yup.object().shape({
	phoneNumber: yup.string().required()
});

export default function SignUp() {
	const navigation = useNavigation();
	const { height } = Dimensions.get("screen");
	const Toast = useToast()
	
	const signUpWithPhoneNumber = useAuthStore(s => s.signUpWithPhoneNumber)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormInput>({
		resolver: yupResolver(schema),
	});

	// NOTE: Let's try to avoid putting package specific code inside 
	//  output JSX as much as we can
	const onConfirm = handleSubmit(
		// when successfull
		({ phoneNumber }) => {
			// works
			signUpWithPhoneNumber(phoneNumber)
				.then(confirmCode => {
					navigation.navigate(SignUpNavKey.VerifyScreen, { 
						phoneNumber,
						confirmCode
					})
				}).catch(err => {
					console.error(err)
					Toast.show({
						title: "Error",
						description: err.message,
					})	
				})
		},

		// when invalid
		(err) => {
			Toast.show({
				title: "Error",
				description: `Unable to confirm for ${err.phoneNumber}`
			})
		}
	)


	return (
		<AltContainer backdropHeight={height / 4.2} navigation={navigation} title="Sign up" headerMode="with-back">
			<View flexGrow={1}>	
				<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} paddingBottom={10} marginX={5} marginBottom={10}>
					<VStack space={5} marginBottom={15}>
						<ControllerFormInput
							name="phoneNumber"
							control={control}
							label="Enter phone number"
							keyboardType="phone-pad"
						/>
					</VStack>
					<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>
						<PrimaryButton
							text={"Confirm"}
							onPress={onConfirm}
						/>
					</Box>
				</Box>
			</View>
			<Stack alignItems="center" marginBottom={5}>
				<HStack>
					<Text> Already have an account? </Text>
					<Pressable
						focusable
						onPress={() => {
							navigation.navigate(PlainNavKey.LoginScreen);
						}}
					>
						<Text bold color={colors.primary}>
							Sign in!
						</Text>
					</Pressable>
				</HStack>
			</Stack>
		</AltContainer>
	)
};
