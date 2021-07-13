import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Input, ScrollView, Spacer, Stack, Text } from "native-base";
import { PrimaryButton } from "../components/button";
import { Header, HeaderwithBack } from "../components/header";
import { TextInput } from "../components/textFields";
import { colors } from "../contants/colors";
import { Number } from "../components/textFields";

// import auth from '@react-native-firebase/auth';
import { useMutation } from 'react-query'
import { ToastAndroid } from "react-native";


const SignUp = () => {
	const navigation = useNavigation();
	// If null, no SMS has been sent
	const [confirm, setConfirm] = useState(null);

	const [phoneNumber, setPhoneNumber] = useState('')
	const [code, setCode] = useState('');

	// Handle the button press
	async function signInWithPhoneNumber() {
		console.log("Signing in with : ", phoneNumber)
		// const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		// setConfirm(confirmation);
	}

	async function confirmCode() {
		try {
			// await confirm.confirm(code);

		// TODO: when completed check the user phone number and check if is a new user or not
		} catch (error) {
			console.log('Invalid code.');
			ToastAndroid.show("Invalid verificaton code", ToastAndroid.SHORT);
		}
	}

	const { mutate: singIn, isLoading, error } = useMutation(
		!confirm ? signInWithPhoneNumber : confirmCode
		, {
			onError: (error, variables, context) => {
				// An error happened!
				console.log(`sign in error ${error}`)
			},
			onSuccess: (data, variables, context) => {
				// Boom baby!
				console.log("sign in went on right way ")
			},
		})

	console.log("any error ", error)
	// console.log("Confirmation : ", confirm)

	if (!confirm) {
		return (
			<Stack>
				<ScrollView>
					<Stack
						backgroundColor={colors.primary}
						borderBottomRadius={40}
						height={"80%"}
						position="absolute"
						top={0}
						left={0}
						right={0}
					></Stack>
					<Stack paddingY={10}>
						<Stack
							alignItems="center"
							style={{ paddingBottom: 80, paddingLeft: 25 }}
						>
							<HeaderwithBack
								text="Sign up"
								onBackPress={() => {
									navigation.navigate("Login");
								}}
								color="white"
							/>
						</Stack>

						<Stack alignItems="center">
							<Box bg="white" shadow={2} rounded={10} width="90%">
								<Stack
									style={{
										paddingHorizontal: 20,
										paddingTop: 10,
										paddingBottom: 40,
									}}
								>
									<TextInput
										// flex={1}
										onChangeText={text => setPhoneNumber(text)}
										holderText={"Email or Phone Number"}
									/>
								</Stack>
								<Box mb={-6} paddingX={"5%"}>
									<PrimaryButton
										isLoading={isLoading}
										disabled={isLoading}
										text={"Sign up"}
										press={singIn}
									/>
								</Box>
							</Box>
						</Stack>
					</Stack>
				</ScrollView>
			</Stack>
		);
	}

	return (
		<ScrollView>
			<Stack
				backgroundColor={colors.primary}
				borderBottomRadius={40}
				height={"80%"}
				position="absolute"
				top={0}
				left={0}
				right={0}
			></Stack>
			<Stack paddingBottom={10} paddingTop={10}>
				<Stack
					alignItems="center"
					style={{ paddingBottom: 80, paddingLeft: 25 }}
				>
					<HeaderwithBack
						text="Verify Your Number"
						onBackPress={() => {
							setConfirm(null)
						}}
						color="white"
					/>
				</Stack>

				<Stack alignItems="center">
					<Box bg="white" shadow={2} rounded={10} width="90%" px={6}>
						<Stack paddingBottom={10}>
							<Spacer size={20} />

							<Stack >
								<Text style={{ justifyContent: "center" }}>
									Enter the verification number that was sent
									to your phone recently
								</Text>
							</Stack>
							<Spacer size={30} />

							<Input onChangeText={(code) => setCode(code)}
								placeholder="265720"
							/>

						</Stack>
						<Box mb={-6} paddingX={"5%"}>
							<PrimaryButton
								isLoading={isLoading}
								disabled={isLoading}
								text={"Confirm"}
								press={singIn}
							/>
						</Box>
					</Box>
				</Stack>
			</Stack>
			<Stack alignItems="center" marginBottom={5}>
				<Text color="#2AD3E7">Resend (00:39)</Text>
			</Stack>
		</ScrollView>
	)


};

export default SignUp;

