import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, View, Stack, VStack, Pressable, Text, Button } from "native-base";
import { PrimaryButton } from "../../../components/button";
import { colors } from "../../../constants/colors";
import { useState } from "react";
import { useAuthStore } from "../../../internals/auth/context";
import AltContainer from "../../../components/containers/AltContainer";

import { Dimensions } from "react-native";
import CodeInput from "../../../components/forms/codeInput";



export default function VerifyScreen ({ route }: any) {
	const phoneNumber: string = route.params.phoneNumber
	const navigation = useNavigation()
	const [code, set] = useState<string>("") 
	const { height } = Dimensions.get("screen");

	const confirmCode = useAuthStore(state => state.confirmPhoneCode)

	// do some action when the code is confirmed
	const onConfirmCode = () => {

		// stop if code is undefined
		if (code === undefined) {
			console.warn("Code is UNDEFINED")
			return;
		}

		// if there is code, confirm it
		confirmCode(code)
			.then(() => console.log("Code confirmed. User object updated, moving to new page"))
			.catch(err => console.log("There is a problem"))
	}

	return (
		<AltContainer backdropHeight={height / 5.2} navigation={navigation} title="Verify Your Number" headerMode="with-back" noScroll>
			<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} paddingBottom={10} marginX={5} marginBottom={10}>
				<VStack space={5} marginBottom={15} alignContent="center">	
					<Text fontWeight="500" textAlign="center" color={"#747F9E"}>
						Enter the verification number that is sent to {phoneNumber}
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
	);
};