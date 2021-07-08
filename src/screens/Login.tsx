import {
	Box,
	Center,
	HStack,
	Input,
	Pressable,
	ScrollView,
	Stack,
	Text,
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
import { Dimensions } from "react-native";
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

	console.log("Errrs",errors)
	return (
		<Stack height={height - 40}>
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
				<Stack paddingBottom={10}>
					<Stack alignItems="center" style={{ paddingVertical: 80 }}>
						<Header head="Login" />
					</Stack>

					<Stack alignItems="center">
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
							<Box mb={-10}>
								<PrimaryButton
									text={"Login"}
									press={handleSubmit(onSubmit)}
								/>
							</Box>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>

			<Stack justifyContent="center">
				<HStack
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
					}}
				>
					<Text> Don't have an account? </Text>
					<Pressable
						onPress={() => {
							navigation.navigate("SignUp");
						}}
					>
						<Text color={colors.primary}>Sign up now!</Text>
					</Pressable>
				</HStack>
			</Stack>
		</Stack>
	);
};

export default Login;
