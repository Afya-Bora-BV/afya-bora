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
	MaterialIcons,
	AntDesign,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { colors } from "../contants/colors";
import { CheckBox } from "../components/bars";
import { PrimaryButton } from "../components/button";
import { Spacer } from "../components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StatusBar } from "react-native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { NavKey as PlainAppNavKey } from './_Plain'
import { useAuthStore } from "../internals/auth/context";
import { useController } from "react-hook-form";
import IconContainer from "../components/icon-container";
import { useCallback } from "react";

interface LoginFormInputs {
	email: string;
	password: string;
}

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().nullable().required(),
});

let render = 0

interface AltContainerProps {
	children: JSX.Element[]
	title?: string
	backdropHeight?: number
	headerMode?: 'with-back' | 'none'
}

function AltContainer ({ children, title, backdropHeight, headerMode }: AltContainerProps) {
	const navigation = useNavigation()
	const onBackPress = useCallback(() => navigation.goBack(), [])
	const _headerMode = headerMode || 'none'

    return (
        <Box flex={1} position="relative">
			<StatusBar translucent backgroundColor={colors.primary} />
            {/* Background image */}
            <Stack
                backgroundColor={colors.primary}
                borderBottomRadius={36}
                height={backdropHeight || 0}
                position="absolute"
                top={0}
                left={0}
                right={0}
            />
            {/* <View position="relative" width="100%" paddingX={5}> */}
			{
				_headerMode === 'none' ? null : (
					_headerMode === 'with-back' ? (
						<HStack justifyContent="space-evenly">
							<Stack
								style={{
									flex: 0.5,
									alignSelf: "flex-start",
								}}
							>
								<Pressable onPress={onBackPress}>
									<Center p={2} backgroundColor="#E7E5FF" borderRadius="4">
										<MaterialIcons
											name="chevron-left"
											size={25}
											color={colors.primary}
										/>
									</Center>
								</Pressable>
							</Stack>
							<Stack
								style={{
									flex: 3,
									justifyContent: "center",
									alignItems: "center",
									paddingRight: 30,
								}}
							>
								<Text fontSize="2xl">
									{title}
								</Text>
							</Stack>

							<Stack
								style={{
									flex: 0.5,
									alignSelf: "flex-end",
								}}
							></Stack>
						</HStack>
					) : null
				)
			}
				
                {/* Placeholder for icon */}
                {/* <Square size="sm" rounded="lg" bg="primary.400">
                    <Box
                        _text={{
                            fontWeight: "bold",
                            fontSize: "lg",
                            color: "white",
                        }}
                        >
                    20
                    </Box>
                </Square>
                <Box position="absolute" alignSelf="center" alignItems="center" justifyContent="center">
                    <Text color="white">{title}</Text>
                </Box>
            </View> */}
            <View flex={1} padding={4} width="100%">
                {children}
            </View>
        </Box>
    );
}


function ControllerFormInput ({ label, keyboardType, control, name, ...inputProps }: any)  {
    // console.log({ others })
    const { formState: { errors }, } =  useController({ name, control });

    return (
        <Stack>
            <Text>{label}</Text>
            <Spacer size={10} />
            <Controller
                control={control}
                render={({
                    field: { onChange, onBlur, value },
                }) => (
                    <Input
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        outlineColor={
                            errors[name] ? "red" : ""
                        }
                        variant="rounded"
                        autoCapitalize={"none"}
						{...inputProps}
                        placeholder={label}
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
            />
        </Stack>
    )
}
	
export default function Login () {
	// const [remember, setRemember] = React.useState(false);
	const [visibility, setVisibility] = React.useState("eye-off-outline");
	const navigation = useNavigation();
	const login = useAuthStore(state => state.login)
	
	const { height } = Dimensions.get("screen");

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
	});

	const onLogin = (data: LoginFormInputs) => {
		console.log(data);
		login()
			.then(() => console.log("Loggin success"))
			.catch(err => console.error("Something!"))
	};

	console.log('Rendering loginpage:', render++)
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
