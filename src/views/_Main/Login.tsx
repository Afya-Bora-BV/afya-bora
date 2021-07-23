import {
	Box,
	Center,
	HStack,
	Input,
	Pressable,
	ScrollView,
	Stack,
	Text,
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

import { NavKey as _MainAppNavKey } from './_navigator'
import { useAuthStore } from "../../internals/auth/context";
import AltContainer from "../../components/containers/AltContainer";
import { ControllerFormInput } from "../../components/forms/inputs";
import { useMutation } from "react-query";
import _ from "lodash";

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CodeInput from "../../components/forms/codeInput";



// TODO : logic to be moved somewhere on refactor

const checkUserProfile = async (phoneNumber: string): Promise<User | undefined> => {
	const uid = await auth().currentUser?.uid
	console.log("USER ID 1 : ", uid)
	const profile = await firestore().collection("patients").doc(uid).get()
	let data = undefined
	if (profile.exists) {
		data = { ...profile.data(), pid: profile.id } as User
	}
	return data
}


// let render = 0

const { height } = Dimensions.get("screen");

/**
 * Form for Phone number only
 * ----------------------------
 */
const formPhoneSchema = yup.object().shape({
	phoneNumber: yup.string().required()
});
interface FormPhoneInputs {
	phoneNumber: string
}

const SendConfirmationCode = ({ signInWithPhoneNumber }: { signInWithPhoneNumber: (phoneNumber: string) => Promise<void> }) => {
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues
	} = useForm<FormPhoneInputs>({
		// resolver: yupResolver(formPhoneSchema),
	});

	const { phoneNumber, updatePhoneNumber } = useAuthStore((state) => ({ phoneNumber: state.phone, updatePhoneNumber: state.updatePhoneNumber }))

	const onLogin = handleSubmit(
		// When successfull
		async ({ phoneNumber }) => {
			// do somthign with phone #
			console.log("Usee phone number ", phoneNumber)
			await login(phoneNumber)
			console.log("Phone to be updated ", phoneNumber)
			updatePhoneNumber(phoneNumber)

		},
		// when invalid
		(err: any) => { console.log("Form is invalid") }
	)


	const { isLoading, mutate: login } = useMutation(signInWithPhoneNumber, {
		onError: (error, variables, context) => {
			// An error happened!
			console.log(`rolling back optimistic update with id `, error)
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			// updating phoneNumber on success

		},

	})


	return (
		<AltContainer title="Afya Bora" backdropHeight={height / 5.5}>
			<View flexGrow={1} marginTop={10}>
				<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} marginX={5}>
					<VStack space={5} marginBottom={15}>
						<ControllerFormInput
							name="phoneNumber"
							control={control}
							label="Enter Phone number"
							keyboardType="phone-pad"
						/>
					</VStack>
					<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>
						<Button
							onPress={onLogin}
							borderRadius={20}
							isLoading={isLoading}
							disabled={isLoading}
							style={{ backgroundColor: colors.primary }}
							_text={{ color: "white" }}
							shadow={5}
						>
							Login
						</Button>
					</Box>
				</Box>
			</View>

			<Stack alignItems="center" marginBottom={5}>
				<HStack>
					<Text> Are you a doctor ? </Text>
					<Pressable
						focusable

						// TODO: detect platform and show cursor="Pointer" only in web
						// using Platform api in RN
						// cursor="pointer"
						onPress={() => {
							navigation.navigate(_MainAppNavKey.LoginDoctorScreen);
						}}
					>
						<Text bold color={colors.primary}>
							Sign in
						</Text>
					</Pressable>
				</HStack>
			</Stack>
		</AltContainer>
	)
}

const VerifyCode = ({ verify }: { verify: (code: string) => Promise<void> }) => {
	const navigation = useNavigation();
	const [code, set] = useState<string>("")

	const { phoneNumber, updatePhoneNumber, updateProfile } = useAuthStore((state) => ({ phoneNumber: state.phone, updatePhoneNumber: state.updatePhoneNumber, updateProfile: state.updateProfile }))

	const onConfirmCode = async () => {
		console.log("Phone ", phoneNumber)
		await confirmCode()

		// after success login we check is the user exists

		const profile = await checkUserProfile(phoneNumber)

		if (!profile) {
			// directing to complete profile screen
			navigation.navigate(_MainAppNavKey.CreateProfileView)
			console.log("What cant navigate ")
		} else {
			updateProfile(profile)
		}

		console.log("The user exists ", profile)
		// check if the user exists

	}

	const { isLoading, mutate: confirmCode } = useMutation(() => verify(code), {
		onError: (error, variables, context) => {
			// An error happened!
			console.log(`rolling back optimistic update with id `, error)
		},
		onSuccess: (data, variables, context) => {
			// Boom baby!
			console.log("Successfully logged on ")
		},

	})



	return (
		<AltContainer backdropHeight={height / 5.2} navigation={navigation} title="Verify Your Number" noScroll>
			<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} paddingBottom={10} marginX={5} marginBottom={10}>
				<VStack space={5} marginBottom={15} alignContent="center">
					<Text fontWeight="500" textAlign="center" color={"#747F9E"}>
						Enter the verification number {phoneNumber}
					</Text>
					<CodeInput
						value={code}
						onChangeCode={set}
						cellCount={4}
					/>
				</VStack>
				<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>
					{/* COnfirm button */}
					<Button
						onPress={onConfirmCode}
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
				<Text color="#2AD3E7">Resend (00:39)</Text>
			</View>
		</AltContainer>
	)
}

export default function Login() {

	const Toast = useToast()
	const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult>();


	async function signInWithPhoneNumber(phoneNumber: string) {
		// checking if the phone exists
		// await checkUserProfile(phoneNumber)
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		setConfirm(confirmation);
		Toast.show({
			title: `Verification code sent to ${phoneNumber}`,
		})

	}

	async function confirmCode(code: string) {
		try {
			await confirm?.confirm(code);
		} catch (error) {
			console.log('Invalid code.');
		}
	}

	if (!confirm) {
		return (
			<SendConfirmationCode signInWithPhoneNumber={signInWithPhoneNumber} />

		);
	}
	return (
		<VerifyCode verify={confirmCode} />
	);
};