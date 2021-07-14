import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, View, Stack, VStack, Pressable, Text } from "native-base";
import { PrimaryButton } from "../../components/button";
import { colors } from "../../contants/colors";
import { useState } from "react";
import { useAuthStore } from "../../internals/auth/context";
import AltContainer from "../../components/containers/AltContainer";

import { Dimensions } from "react-native";



export default function VerifyScreen ({ route }: any) {
	const phoneNumber: string = "123123" || route.params.phoneNumber
	const navigation = useNavigation()
	const [code, set] = useState<string | undefined>("3") 
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
		<AltContainer backdropHeight={height / 5.2} navigation={navigation} title="Verify Your Number" headerMode="with-back">
			<View>
				<Box bg="white" position="relative" shadow={2} rounded="xl" padding={5} paddingBottom={10} marginX={5} marginBottom={10}>
					<VStack space={5} marginBottom={15}>	
						<Text>react-native-confirmation-code-field</Text>
					</VStack>
					<Box position="absolute" bottom={-20} left={0} right={0} width="100%" paddingX={10}>
						<PrimaryButton
							text={"Confirm"}
							shadow={5}
							press={onConfirmCode}
						/>
					</Box>
				</Box>
			</View>
			<View flex={1} alignItems="center" marginBottom={5}>
		 		<Text color="#2AD3E7">Resend (00:39)</Text>
		 	</View>
		</AltContainer>
	);
};
