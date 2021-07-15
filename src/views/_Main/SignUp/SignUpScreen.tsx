import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, VStack, View, Pressable, Stack, Text } from "native-base";
import { PrimaryButton } from "../../../components/button";
import { colors } from "../../../constants/colors";


import { NavKey as SignUpNavKey } from '.'
import { NavKey as PlainNavKey} from '..'
import AltContainer from "../../../components/containers/AltContainer";
import { Dimensions } from "react-native";
import { ControllerFormInput } from "../../../components/forms/inputs";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";

interface SignUpFormInput {
	email: string;
	password: string;
}

const schema = yup.object().shape({
	password: yup.string().required(),
});

export default function SignUp  ()  {
	const navigation = useNavigation();
	const [phoneNumber, setPhoneNumber] = useState('')
	const { height } = Dimensions.get("screen");

	// if (!confirm) {
	// 	return (
	// 	);
	// }
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormInput>({
		resolver: yupResolver(schema),
	});

	const onConfirm = useCallback(() => {
		navigation.navigate(SignUpNavKey.VerifyScreen, { phoneNumber })
	}, [])


	return (
		<AltContainer backdropHeight={height / 5.2} navigation={navigation} title="Sign up" headerMode="with-back">
			<View flexGrow={1} >
				<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} paddingBottom={10} marginX={5}>
					<VStack space={5} marginBottom={15}>						
						<ControllerFormInput
							name="phonenumber"
							control={control}
							label="Enter phone number"
							keyboardType="phone-pad"
							type={"text"
								// visibility === "eye-outline"
								// 	? "text"
								// 	: "password"
							}
							InputRightElement={
								<Pressable
									onPress={() => console.log("Pressed")
										// visibility ===
										// 	"eye-outline"
										// 	? setVisibility(
										// 		"eye-off-outline"
										// 	)
										// 	: setVisibility(
										// 		"eye-outline"
										// 	)
									}
								>
									{/* <MaterialCommunityIcons
										// name={visibility}
										size={24}
										color={
											colors.primary
										}
										style={{
											paddingEnd: 10,
										}}
									/> */}
								</Pressable>
							}
						/>
					</VStack>
					<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>
						<PrimaryButton
							text={"Confirm"}
							shadow={5}
							press={onConfirm}
						/>
					</Box>
				</Box>
			</View>

			<Stack alignItems="center" marginBottom={5}>
				<HStack>
					<Text> Already have an account? </Text>
					<Pressable
						focusable
						cursor="pointer"
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
