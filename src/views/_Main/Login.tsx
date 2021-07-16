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

function PhoneNumberForm ({ onSuccess, onError }: any) {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormPhoneInputs>({
		resolver: yupResolver(formPhoneSchema),
	});

	const onLogin = handleSubmit(
		// When successfull
		({ phoneNumber }) => onSuccess({ phoneNumber }),

		// when invalid
		(err) => onError(`Unable to confirm: ${err.phoneNumber?.message}`)
	)

	return (
		<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} marginX={5}>
			<VStack space={5} marginBottom={15}>
				<ControllerFormInput
					name="phone"
					control={control}
					label="Enter Phone number"
					keyboardType="phone-pad" 
				/>
			</VStack>
			<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>
				<Button
					onPress={onLogin}
					borderRadius={20}
					style={{ backgroundColor: colors.primary }}
					_text={{ color: "white" }}
					shadow={5}
				>
					Login 
				</Button>
			</Box>
		</Box>
	)
}
/**
 * Form for Phone number only
 * ----------------------------
 */
const formEmailSchema = yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required(),
});
interface FormEmailInputs {
	email: string
	password: string
}

function EmailPasswordForm ({ onSuccess, onError }: any) {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormEmailInputs>({
		resolver: yupResolver(formEmailSchema),
	});

	const [visibility, setVisibility] = React.useState("eye-off-outline");

	const onLogin = handleSubmit(
		// When successfull
		({ email, password }) => onSuccess({ email, password }),

		// when invalid
		(err) => onError(`Unable to confirm: ${err.email?.message}`)
	)

	return (
		<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} marginX={5}>
			<VStack space={5} marginBottom={15}>
				<ControllerFormInput
					name="email"
					control={control}
					label="Phone number"
					keyboardType="email-address" 
				/>
				<ControllerFormInput
					name="password"
					control={control}
					label="Enter Password"
					keyboardType="password"
					type={
						visibility === "eye-outline"
							? "text"
							: "password"
					}
					InputRightElement={
						<Pressable
							onPress={() =>
								visibility ===
									"eye-outline"
									? setVisibility(
										"eye-off-outline"
									)
									: setVisibility(
										"eye-outline"
									)
							}
						>
							<MaterialCommunityIcons
								name={visibility}
								size={24}
								color={
									colors.primary
								}
								style={{
									paddingEnd: 10,
								}}
							/>
						</Pressable>
					}
				/>
			</VStack>
			<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>

				<Button
					onPress={onLogin}
					borderRadius={20}
					style={{ backgroundColor: colors.primary }}
					_text={{ color: "white" }}
					shadow={5}
				>
					Login 
				</Button>
			</Box>
		</Box>
	)
}

export default function Login() {
	// const [remember, setRemember] = React.useState(false);
	const navigation = useNavigation();
	const { signInWithEmailAndPassword, signInWithPhoneNumber } = useAuthStore(({ signInWithPhoneNumber, signInWithEmailAndPassword }) => ({ signInWithPhoneNumber, signInWithEmailAndPassword }))
	const [type, setType] = useState<'email' | 'phone'>('phone')
	const Toast = useToast()

	// TODO: pass to login the correct email and password
	// TODO: considering having two Mutations
	// 1. for login 
	// 2. for verifying code
	// const { mutate: loginWithPhoneNumber, isLoading } = useMutation(() => !confirm ? login(getValues("phone")) : confirmCode(getValues("confirmCode")), {
	// 	onMutate: variables => {
	// 	},
	// 	onError: (error, variables, context) => {
	// 		console.log("Something went wrong")
	// 	},
	// 	onSuccess: (data, variables, context) => {
	// 		// console.log("User logged in successfully ")
	// 		// Boom baby!
	// 	},

	// })
	// const { mutate: loginWithPhoneNumber, isLoading } = useMutation(() => !confirm ? login(getValues("phone")) : confirmCode(getValues("confirmCode")), {
	// 	onMutate: variables => {
	// 	},
	// 	onError: (error, variables, context) => {
	// 		console.log("Something went wrong")
	// 	},
	// 	onSuccess: (data, variables, context) => {
	// 		// console.log("User logged in successfully ")
	// 		// Boom baby!
	// 	},

	// })

	const onSuccess = (data: FormEmailInputs | FormPhoneInputs ) => {
		if (type === 'phone') {
			// Dealing the sign in process as a form input
			const { phoneNumber } = data as FormPhoneInputs
			
			signInWithPhoneNumber(phoneNumber)
				.then(() => console.log("Yoooooo Phone!"))

		} else if (type === 'email') {
			// Dealing the sign in process as a email
			const { email, password } = data as FormEmailInputs
			
			signInWithEmailAndPassword(email, password)
				.then(() => console.log("Yoooooo!"))
		}

		return;
	}

	const onError = (errMessage: string) => {
		// Show error
		Toast.show({
			title: "Error",
			description: errMessage,
		})
	}

	// console.log("Confirm  : ",confirm)
	return (
		<AltContainer title="Afya Bora" backdropHeight={height / 5.5}>
			<View flexGrow={1}>
				{
					type === 'phone' ? (
						<PhoneNumberForm onSuccess={onSuccess} onError={onError} />
					) : (
						<EmailPasswordForm onSuccess={onSuccess} onError={onError} />
					)
				}
			</View>

			<Stack alignItems="center" marginBottom={5}>
				<HStack>
					<Text> Don't have an account? </Text>
					<Pressable
						focusable

						// TODO: detect platform and show cursor="Pointer" only in web
						// using Platform api in RN
						// cursor="pointer"
						onPress={() => {
							navigation.navigate(_MainAppNavKey.SignUpViewScreen);
						}}
					>
						<Text bold color={colors.primary}>
							Sign up now!
						</Text>
					</Pressable>
				</HStack>
			</Stack>
		</AltContainer>
	);
};