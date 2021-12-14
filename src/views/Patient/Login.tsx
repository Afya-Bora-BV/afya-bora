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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions, ToastAndroid, TouchableOpacity } from "react-native";
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
import Home from "./HomeScreen";
import { userHasProfile } from "../../api";

// TODO : logic to be moved somewhere on refactor

// let render = 0
const { height } = Dimensions.get("screen");

type SendConfirmationProps = {
	phoneNumber: string;
	onChangeNumber: (tel: string) => void;
	onSubmit: () => void;
	isLoading: boolean;
};

const SendConfirmationCode = ({
	phoneNumber,
	onChangeNumber,
	isLoading,
	onSubmit,
}: SendConfirmationProps) => {
	const navigation = useNavigation();
	const [language] = useAtom(languageAtom);

	const phoneInput = React.useRef<PhoneInput>(null);

	const phoneInputPlaceHolder =
		language == "en" ? "Phone Number" : "Namba Ya Simu";
	return (
		<AltContainer title="common.signIn" backdropHeight={height / 5.5}>
			<View flexGrow={1} marginTop={10} testID="PatientLoginScreen">
				<Box
					bg="white"
					// position="relative"
					shadow={2}
					rounded="xl"
					padding={5}
					marginX={5}
				>
					<VStack space={5} marginBottom={18}>
						<PhoneInput
							placeholder={phoneInputPlaceHolder}
							ref={phoneInput}
							defaultValue={phoneNumber}
							defaultCode="TZ"
							layout="first"
							onChangeFormattedText={(text) => {
								onChangeNumber(text);
							}}
							withShadow
							autoFocus
						/>
					</VStack>
				</Box>
				<Button
					onPress={onSubmit}
					borderRadius={20}
					w={260}
					isLoading={isLoading}
					disabled={isLoading}
					style={{ backgroundColor: colors.primary }}
					_text={{ color: "white" }}
					shadow={5}
					alignSelf={"center"}
					mt={-5}
				>
					<Text color="white" tx="common.continue">
						Continue
					</Text>
				</Button>
			</View>

			<Stack alignItems="center" marginBottom={5}>
				<HStack>
					<Text tx="common.areYouDoctor"> </Text>
					<Pressable
						focusable
						onPress={() => {
							navigation.navigate(DoctorRoutes.DoctorLogin);
						}}
					>
						<Text
							tx="common.signIn"
							bold
							color={colors.primary}
						></Text>
					</Pressable>
				</HStack>
			</Stack>
		</AltContainer>
	);
};

type VerifyCodeProps = {
	resentCode: boolean;
	submit: () => void;
	onChangeCode: (code: string) => void;
	confirmationCode: string;
	resendCode: () => void;
	isLoading: boolean;
};

const VerifyCode = ({
	isLoading,
	confirmationCode,
	onChangeCode,
	submit,
	resendCode,
	resentCode,
}: VerifyCodeProps) => {
	const navigation = useNavigation();
	return (
		<AltContainer
			backdropHeight={height / 5.2}
			navigation={navigation}
			title="common.verifyYourNumber"
			noScroll
		>
			<View flexGrow={1} marginTop={10} testID="PatientVerifyScreen">
				<Box
					bg="white"
					position="relative"
					shadow={2}
					rounded="xl"
					padding={5}
					paddingBottom={10}
					marginX={5}
				>
					<VStack space={5} marginBottom={0} alignContent="center">
						<Text
							fontWeight="500"
							textAlign="center"
							color={"#747F9E"}
							tx="common.verificationCode"
						>
							Verification Code
						</Text>
						<CodeInput
							value={confirmationCode}
							onChangeCode={onChangeCode}
							cellCount={4}
						/>
					</VStack>
				</Box>
				{/* Confirm button */}
				<Button
					onPress={submit}
					borderRadius={20}
					w={260}
					isLoading={isLoading}
					disabled={isLoading}
					width="100%"
					_disabled={{
						backgroundColor: "#B0B3C7",
						color: "white",
					}}
					style={{ backgroundColor: colors.primary, elevation: 10 }}
					_text={{ color: "white" }}
					alignSelf={"center"}
					mt={-5}
				>
					<Text tx="common.confirm" color="white">
						Confirm
					</Text>
				</Button>

				{!resentCode && (
					<TouchableOpacity
						style={{ alignItems: "center", marginTop: 20 }}
						onPress={resendCode}
					>
						<Text color="#2AD3E7">Resend Code</Text>
					</TouchableOpacity>
				)}
			</View>
		</AltContainer>
	);
};

export default function Login() {
	const navigation = useNavigation();
	const route = useRoute();
	const [resentCode, setResentCode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [confirm, setConfirm] =
		useState<FirebaseAuthTypes.ConfirmationResult>();
	const [confirmationCode, setConfirmationCode] = useState<string>("");

	const { signIn, currentUser, profile, loadingProfile, loadingUser } =
		useAuth();

	const submitTelephone = (phoneNumber: string) => {
		if (loading) {
			return;
		}
		setLoading(true);
		signIn(phoneNumber)
			.then((res) => {
				setLoading(false);
				setConfirm(res);
				ToastAndroid.show(
					"Verification code sent to " + phoneNumber,
					3000
				);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				ToastAndroid.show(
					"There was an error. Please try again.",
					3000
				);
			});
	};

	const completingAppointment = useRoute().params?.completingAppointment;

	async function confirmCode(code: string) {
		setLoading(true);
		console.log("We out here!");
		console.log(completingAppointment);
		try {
			const confirmation = await confirm?.confirm(code);
			const hasProfile =
				confirmation && (await userHasProfile(confirmation?.user.uid));
			console.log(hasProfile);
			setLoading(false);
			if (hasProfile && completingAppointment) {
				return navigation.navigate(HomeNavKey.ConfirmAppointment);
			} else if (hasProfile && !completingAppointment) {
				return navigation.navigate(HomeNavKey.HomeScreen);
			} else if (!hasProfile) {
				return navigation.navigate(HomeNavKey.CreateProfile, {
					completingAppointment,
				});
			}
			console.warn("State should be unreachable");
			// navigation.navigate(hasProfile ? HomeNavKey.HomeScreen : HomeNavKey.CreateProfile)
		} catch (error) {
			console.log(error);
			setLoading(false);
			throw new Error("Invalid verification code : ");
		}
	}

	const resendCode = () => {
		auth()
			.signInWithPhoneNumber(phoneNumber, true)
			.then((res) => {
				ToastAndroid.show("Confirmation code resent", 3000);
				setResentCode(true);
			});
	};

	if (!confirm) {
		return (
			<SendConfirmationCode
				phoneNumber={phoneNumber}
				isLoading={loading}
				onSubmit={() => submitTelephone(phoneNumber)}
				onChangeNumber={(number: string) => setPhoneNumber(number)}
			/>
		);
	}
	return (
		<VerifyCode
			resentCode={resentCode}
			resendCode={resendCode}
			isLoading={loading}
			confirmationCode={confirmationCode}
			onChangeCode={(code) => setConfirmationCode(code)}
			submit={() => confirmCode(confirmationCode)}
		/>
	);
}
