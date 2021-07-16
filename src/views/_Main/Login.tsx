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
} from "native-base";
import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { CheckBox } from "../../components/bars";
import { PrimaryButton } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ToastAndroid } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { NavKey as _MainAppNavKey } from './_navigator'
import { useAuthStore } from "../../internals/auth/context";
import AltContainer from "../../components/containers/AltContainer";
import { ControllerFormInput } from "../../components/forms/inputs";
import { useCallback } from "react";
import { useMutation } from "react-query";
import _ from "lodash";

interface LoginFormInputs {
	phone: string;
	// password: string;
	confirmCode: string
}

const schema = yup.object().shape({
	phone: yup.string(),
	// password: yup.string().nullable().required(),
	confirmCode: yup.string()
});

// let render = 0


const { height } = Dimensions.get("screen");

export default function Login() {
	// const [remember, setRemember] = React.useState(false);
	const [visibility, setVisibility] = React.useState("eye-off-outline");
	const navigation = useNavigation();
	const { login, confirm, confirmCode } = useAuthStore(state => ({ login: state.signInWithPhoneNumber, confirmCode: state.confirmPhoneCode, confirm: state.confirm }))

	
	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues
	} = useForm<LoginFormInputs>({
		// resolver: yupResolver(schema),
	});

	const onLogin = async () => {
		console.log("Logging in ")
		loginWithPhoneNumber()
	};

	// TODO: pass to login the correct email and password
	// TODO: considering having two Mutations
	// 1. for login 
	// 2. for verifying code
	const { mutate: loginWithPhoneNumber, isLoading } = useMutation(() => !confirm ? login(getValues("phone")) : confirmCode(getValues("confirmCode")), {
		onMutate: variables => {
		},
		onError: (error, variables, context) => {
			console.log("Something went wrong")
		},
		onSuccess: (data, variables, context) => {
			// console.log("User logged in successfully ")
			// Boom baby!
		},

	})


	console.log('Rendering loginpage:', getValues())
	// console.log("Confirm  : ",confirm)
	return (
		<AltContainer backdropHeight={height / 3.5}>
			{/* <Stack alignItems="center" style={{ paddingVertical: 10 }}> */}
			<View flexGrow={1}>
				<View alignItems="center" paddingY={20}>
					<Text color="white" fontSize={44}>
						Afya Bora
					</Text>
				</View>
				{/* </Stack> */}
				{/* <Stack paddingBottom={10}> */}
				<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} marginX={5}>
					<VStack space={5} marginBottom={15}>
						{!confirm ?
							<ControllerFormInput
								name="phone"
								control={control}
								label="Phone number"
								placeholder="+255755330099"
							// keyboardType="email-address" 
							/>
							:
							<ControllerFormInput
								name="confirmCode"
								control={control}
								label="Verification code"
								placeholder="1234"
							// keyboardType="email-address" 
							/>
						}


						{/* <ControllerFormInput
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
						/> */}
						{/* Remeber me + Forgot Password */}
						{/* <HStack justifyContent="space-between">
							<CheckBox item={"Remember me"} />
							<Stack justifyContent="center">
								<Pressable>
									<Text color={"#2AD3E7"}>
										Forgot Password
									</Text>
								</Pressable>
							</Stack>
						</HStack> */}
					</VStack>
					<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>

						<Button
							onPress={handleSubmit(onLogin, () => {
								console.log("Ther is a form error")
							})}
							borderRadius={20}
							// _disabled={{
							// 	backgroundColor: "#B0B3C7",
							// 	color: "white",
							// }}
							style={{ backgroundColor: colors.primary }}
							_text={{ color: "white" }}
							isLoading={isLoading}
							disabled={isLoading}
							shadow={5}

						>
							Login 
						</Button>
					</Box>
				</Box>
				{/* </Stack> */}
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