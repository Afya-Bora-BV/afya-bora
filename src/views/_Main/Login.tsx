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
} from "native-base";
import * as React from "react";
import { CheckBox } from "../../components/bars";
import { colors } from "../../constants/colors";
import { PrimaryButton } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { NavKey as PlainAppNavKey } from '.'
import { useAuthStore } from "../../internals/auth/context";
import AltContainer from "../../components/containers/AltContainer";
import { ControllerFormInput } from "../../components/forms/inputs";
import { useMutation } from "react-query";

interface LoginFormInputs {
	email: string;
	password: string;
}

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().nullable().required(),
});

// let render = 0

export default function Login() {
	// const [remember, setRemember] = React.useState(false);
	const [visibility, setVisibility] = React.useState("eye-off-outline");
	const navigation = useNavigation();
	const login = useAuthStore(state => state.signInWithEmailAndPassword)

	const { height } = Dimensions.get("screen");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		// resolver: yupResolver(schema),
	});

	const onLogin = () => {
		console.log("Logging in ")
		loginInWithEmailAndPassword()

	};

	// TODO: pass to login the correct email and password
	const { mutate: loginInWithEmailAndPassword, isLoading } = useMutation(() => login("demoemil@gmail.com", "password"), {
		onMutate: variables => {
		},
		onError: (error, variables, context) => {
			console.log("Something went wrong")
		},
		onSuccess: (data, variables, context) => {
			console.log("User logged in successfully ")

			// Boom baby!
		},

	})


	// console.log('Rendering loginpage:', render++)
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
						<ControllerFormInput
							name="email"
							control={control}
							label="Email or phone number"
							keyboardType="email-address" />

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
								</Pressable>
							}
						/>
						{/* Remeber me + Forgot Password */}
						<HStack justifyContent="space-between">
							<CheckBox item={"Remember me"} />

							<Stack justifyContent="center">
								<Pressable>
									<Text color={"#2AD3E7"}>
										Forgot Password
									</Text>
								</Pressable>
							</Stack>
						</HStack>
					</VStack>
					<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>
						<PrimaryButton
							text={"Login"}
							shadow={5}
							isLoading={isLoading}
							disabled={isLoading}
							onPress={handleSubmit(onLogin, () => {
								console.log("Ther is a form error")
							})}
						/>
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
							navigation.navigate(PlainAppNavKey.SignUpViewScreen);
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
