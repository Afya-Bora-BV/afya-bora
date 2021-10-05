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
import React, { useState, useCallback, useEffect } from "react";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ToastAndroid } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AltContainer from "../../components/containers/AltContainer";
import { ControllerFormInput } from "../../components/forms/inputs";
import { useMutation } from "react-query";
import _ from "lodash";
import PhoneInput from "react-native-phone-number-input";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import CodeInput from "../../components/forms/codeInput";
import { DoctorRoutes, HomeNavKey } from ".";
import { useAuth } from "../../contexts/AuthContext";
import { Text } from "../../components/text";
import { useAtom } from "jotai";
import { languageAtom } from "../../store/atoms";

// TODO : logic to be moved somewhere on refactor

// let render = 0
const { height } = Dimensions.get("screen");


const SendConfirmationCode = ({
	signInWithPhoneNumber,
}: {
	signInWithPhoneNumber: (phoneNumber: string) => Promise<void>;
}) => {
	const navigation = useNavigation();

	const [value, setValue] = useState("");
	const [formattedValue, setFormattedValue] = useState("");
	const phoneInput = React.useRef<PhoneInput>(null);
	const [language]=useAtom(languageAtom)
	const onLogin = () => {
		// do somthign with phone #
		if (!Boolean(formattedValue)) {
			ToastAndroid.show(`Phone number can not be empty`, ToastAndroid.SHORT)
			return
		}
		console.log("Usee phone number ", formattedValue);
		login(formattedValue);


	}

	const { isLoading, mutate: login } = useMutation(signInWithPhoneNumber, {
		onError: (error: FirebaseAuthTypes.PhoneAuthError, variables, context) => {
			// An error happened!
			console.log(`rolling back optimistic update with id `, error);
			if (error.code === "auth/invalid-phone-number") {
				ToastAndroid.show(`Invalid phone number format`, ToastAndroid.SHORT)
				return
			}
			ToastAndroid.show(`Error : ${error?.code}`, ToastAndroid.SHORT)
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			// updating phoneNumber on success
			console.log("Here it is");
			ToastAndroid.show(`Verification code sent to ${formattedValue}`, ToastAndroid.SHORT)
			console.log(data);
		},
	});

	const phoneInputPlaceHolder=language=="en"?"Phone Number":"Nambe Ya Simu"
	return (
		<AltContainer title="common.signIn" backdropHeight={height / 5.5}>
			<View flexGrow={1} marginTop={10} testID="PatientLoginScreen">
				<Box
					bg="white"
					position="relative"
					shadow={2}
					rounded="xl"
					padding={5}
					marginX={5}
				>
					<VStack space={5} marginBottom={15}>
						<PhoneInput
							placeholder={phoneInputPlaceHolder}
							ref={phoneInput}
							defaultValue={value}
							defaultCode="TZ"
							layout="first"
							onChangeText={(text) => {
								setValue(text);
							}}
							onChangeFormattedText={(text) => {
								setFormattedValue(text);
							}}
							// withDarkTheme
							withShadow
							autoFocus
						/>

					</VStack>
					<Box
						position="absolute"
						bottom={-20}
						left={0}
						right={0}
						paddingX={10}
						justifyContent="center"
						alignItems="center"
					>
						<Button
							onPress={onLogin}
							borderRadius={20}
							w={260}
							isLoading={isLoading}
							disabled={isLoading}
							style={{ backgroundColor: colors.primary }}
							_text={{ color: "white" }}
							shadow={5}
						>
							<Text color="white" tx="common.continue">
								Continue
							</Text>

						</Button>
					</Box>
				</Box>
			</View>

			<Stack alignItems="center" marginBottom={5}>
				<HStack>
					<Text
						tx="common.areYouDoctor"
					> </Text>
					<Pressable
						focusable
						// TODO: detect platform and show cursor="Pointer" only in web
						// using Platform api in RN
						// cursor="pointer"
						onPress={() => {
							navigation.navigate(DoctorRoutes.DoctorLogin);
						}}
					>
						<Text
							tx="common.signIn"
							bold color={colors.primary}>

						</Text>
					</Pressable>
				</HStack>
			</Stack>
		</AltContainer>
	);
};

const VerifyCode = ({
	verify,
}: {
	verify: (code: string) => Promise<void>;
}) => {
	const navigation = useNavigation();
	const Toast = useToast();
	const [code, set] = useState<string>("");
	const uid = auth().currentUser?.uid;

	const onConfirmCode = async () => {
		try {
			await verify(code);
		} catch (e) {
			throw new Error(
				JSON.stringify({
					message: "Error in verifiying phone number",
					error: e,
				})
			);
		}
	};

	const { isLoading, mutate: confirmCode } = useMutation(
		() => onConfirmCode(),
		{
			onError: (error, variables, context) => {
				// An error happened!
				console.log(`Error in verifying code `, error);
				ToastAndroid.show(`Invalid verification code `, ToastAndroid.SHORT)
			},
			onSuccess: (data, variables, context) => {
				// Boom baby!
				console.log("Successfuly verified code ");
				ToastAndroid.show(`Successfully signed in  `, ToastAndroid.SHORT)
			},
		}
	);

	return (
		<AltContainer
			backdropHeight={height / 5.2}
			navigation={navigation}
			title="Verify Your Number"
			noScroll
		>
			<Box
				bg="white"
				position="relative"
				shadow={2}
				rounded="xl"
				padding={5}
				paddingBottom={10}
				marginX={5}
				marginBottom={10}
			>
				<VStack space={5} marginBottom={15} alignContent="center">
					<Text fontWeight="500" textAlign="center" color={"#747F9E"}>
						Verification Code
					</Text>
					<CodeInput value={code} onChangeCode={set} cellCount={4} />
				</VStack>
				<Box
					position="absolute"
					bottom={-20}
					left={0}
					right={0}
					width="100%"
					paddingX={10}
				>
					{/* COnfirm button */}
					<Button
						onPress={async () => {
							await confirmCode();
						}}
						borderRadius={20}
						isLoading={isLoading}
						disabled={isLoading}
						width="100%"
						_disabled={{
							backgroundColor: "#B0B3C7",
							color: "white",
						}}
						style={{ backgroundColor: colors.primary }}
						_text={{ color: "white" }}
					>
						Confirm
					</Button>
				</Box>
			</Box>
			<View flex={1} alignItems="center" marginBottom={5}>
				{/* <Text color="#2AD3E7">Resend (00:39)</Text> */}
			</View>
		</AltContainer>
	);
};

export default function Login() {
	const navigation = useNavigation();
	const [confirm, setConfirm] =
		useState<FirebaseAuthTypes.ConfirmationResult>();

	const { signIn, currentUser, profile, loadingProfile, loadingUser } =
		useAuth();

	async function signInWithPhoneNumber(phoneNumber: string) {
		// checking if the phone exists
		// await checkUserProfile(phoneNumber)
		const confirmation = await signIn(phoneNumber);
		setConfirm(confirmation);
	}

	console.log("\n\nProfile:");
	console.log(profile, currentUser, loadingProfile, loadingUser);
	console.log("\n\n");

	async function confirmCode(code: string) {
		try {
			await confirm?.confirm(code);
		} catch (error) {
			console.log(error);
			throw new Error("Invalid verification code : ");
		}
	}

	if (!confirm) {
		return (
			<SendConfirmationCode
				signInWithPhoneNumber={signInWithPhoneNumber}
			/>
		);
	}
	return <VerifyCode verify={confirmCode} />;
}
