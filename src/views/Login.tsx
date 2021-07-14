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
import {
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../contants/colors";
import { CheckBox } from "../components/bars";
import { PrimaryButton } from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { NavKey as PlainAppNavKey } from './_Plain'
import { useAuthStore } from "../internals/auth/context";
import AltContainer from "../components/containers/AltContainer";
import { ControllerFormInput } from "../components/forms/inputs";
import { useCallback } from "react";

interface LoginFormInputs {
	email: string;
	password: string;
}

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().nullable().required(),
});

// let render = 0
	
export default function Login () {
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
		resolver: yupResolver(schema),
	});

	const onLogin = useCallback(() => {
		handleSubmit(
			// onValid
			function (data, e) {
				console.log(data)
				login(data.email, data.password)
					.then(() => console.log("Logging in success"))
					.catch(err => console.error("Something!"))
			},
			// onInvalid
			function (err) {
				console.error(err)
			}
		)
	}, [login]);

	// console.log('Rendering loginpage:', render++)
	return (
		<AltContainer backdropHeight={height / 3.5}>
			{/* <Stack alignItems="center" style={{ paddingVertical: 10 }}> */}
			<View flexGrow={1} >
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
								press={onLogin}
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
						cursor="pointer"
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
