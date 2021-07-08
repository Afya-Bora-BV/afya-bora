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

const Login = () => {
	const [visibility, setVisibility] = React.useState("eye-off-outline");
	const [remember, setRemember] = React.useState(false);

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
			<Stack paddingBottom={10}>
				<Stack alignItems="center" style={{ paddingVertical: 80 }}>
					<Header head="Login" />
				</Stack>

				<Stack alignItems="center">
					<Box bg="white" shadow={2} rounded="lg" width="90%">
						<Stack
							style={{
								paddingHorizontal: 20,
								paddingTop: 10,
								paddingBottom: 40,
							}}
						>
							<TextInput holderText={"Email or Phone Number"} />

							<Spacer size={20} />

							<Stack>
								<Text>Password</Text>
								<Input
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
												visibility === "eye-outline"
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
												color={colors.primary}
												style={{ paddingEnd: 10 }}
											/>
										</Pressable>
									}
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
							<PrimaryButton text={"Login"} press={() => {}} />
						</Box>
					</Box>
				</Stack>
			</Stack>
			<HStack justifyContent="center">
				<Text> Don't have an account? </Text>
				<Pressable>
					<Text color={colors.primary}>Sign up now!</Text>
				</Pressable>
			</HStack>
		</ScrollView>
	);
};

export default Login;
