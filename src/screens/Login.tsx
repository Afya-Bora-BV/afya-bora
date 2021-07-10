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
	VStack,
} from "native-base";
import * as React from "react";
import {
	MaterialIcons,
	AntDesign,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../contants/colors";
import { Header, IconContainer } from "../components/header";
import { TextInput } from "../components/textFields";
import { CheckBox } from "../components/bars";
import { PrimaryButton } from "../components/button";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Spacer } from "../components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StatusBar } from "react-native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
	const [visibility, setVisibility] = React.useState("eye-off-outline");
	const [remember, setRemember] = React.useState(false);
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");

	interface LoginFormInputs {
		email: string;
		password: string;
	}

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().nullable().required(),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: LoginFormInputs) => {
		console.log(data);
		nav();
	};

	const nav = () => {
		navigation.navigate("Home");
	};

	console.log("Errrs", errors);
	return (
		<Box flex={1} marginTop={4}>
			<StatusBar translucent backgroundColor={colors.primary} />
			<ScrollView>
				<Stack
					backgroundColor={colors.primary}
					borderBottomRadius={36}
					height={height / 2.2}
					position="absolute"
					top={0}
					left={0}
					right={0}
				></Stack>
				<Stack paddingBottom={10}>
					{/* <Stack alignItems="center" style={{ paddingVertical: 10 }}> */}
					<View alignItems="center" paddingY={20}>
						<Text color="white" fontSize={44}>
							Afya Bora
						</Text>
					</View>
					{/* </Stack> */}

					<Stack alignItems="center" >
						<Box bg="white" shadow={2} rounded="lg" width="90%">
							<Stack
								style={{
									paddingHorizontal: 20,
									paddingTop: 20,
									paddingBottom: 40,
								}}
							>
								<Stack>
									<Text>Email or phone number</Text>
									<Spacer size={10} />
									<Controller
										control={control}
										render={({
											field: { onChange, onBlur, value },
										}) => (
											<Input
												value={value}
												onBlur={onBlur}
												onChangeText={(value) =>
													onChange(value)
												}
												outlineColor={
													errors.email ? "red" : ""
												}
												variant="rounded"
												placeholder="Enter email or phone number"
												keyboardType="email-address"
												autoCapitalize={"none"}
											/>
										)}
										name="email"
										rules={{ required: true }}
										defaultValue=""
									/>
								</Stack>

								<Spacer size={20} />

								<Stack>
									<Text>Password</Text>
									<Spacer size={10} />
									<Controller
										control={control}
										render={({
											field: { onChange, onBlur, value },
										}) => (
											<Input
												value={value}
												onBlur={onBlur}
												onChangeText={(value) =>
													onChange(value)
												}
												outlineColor={
													errors.password ? "red" : ""
												}
												variant="rounded"
												placeholder="Enter Password"
												type={
													visibility === "eye-outline"
														? "text"
														: "password"
												}
												autoCapitalize={"none"}
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
										)}
										name="password"
										rules={{ required: true }}
										defaultValue=""
									/>
								</Stack>

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
							</Stack>
							<Box mb={-6} paddingX={"5%"}>
								<PrimaryButton
									text={"Login"}
									shadow={5}
									press={() =>
										// (console.warn("here"), handleSubmit(onSubmit))
										navigation.navigate("Home")
									}
								/>
							</Box>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>

			<Stack alignItems="center" marginBottom={5}>
				<HStack>
					<Text> Don't have an account? </Text>
					<Pressable
						onPress={() => {
							navigation.navigate("SignUp");
						}}
					>
						<Text bold color={colors.primary}>
							Sign up now!
						</Text>
					</Pressable>
				</HStack>
			</Stack>
		</Box>
	);
};

export default Login;
