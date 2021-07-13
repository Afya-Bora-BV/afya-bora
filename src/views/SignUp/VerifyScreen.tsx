import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, ScrollView, Stack, Text } from "native-base";
import { PrimaryButton } from "../../components/button";
import { HeaderwithBack } from "../../components/header";
import { Spacer } from "../../components/Spacer";
import { Number } from "../../components/textFields";
import { colors } from "../../contants/colors";
import { useState } from "react";
import { useAuthStore } from "../../internals/auth/context";

export default function VerifyScreen ({ route }: any) {
	const phoneNumber: string = route.params.phoneNumber
	const [code, set] = useState<string | undefined>("3") 

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
			<Stack paddingBottom={10} paddingTop={10}>
				<Stack
					alignItems="center"
					style={{ paddingBottom: 80, paddingLeft: 25 }}
				>
					<HeaderwithBack
						text="Verify Your Number"
						onBackPress={() => {
							navigation.goBack();
						}}
						color="white"
					/>
				</Stack>

				<Stack alignItems="center">
					<Box bg="white" shadow={2} rounded={10} width="90%">
						<Stack paddingBottom={10}>
							<Spacer size={20} />

							<Stack style={{ paddingHorizontal: 25 }}>
								<Text style={{ justifyContent: "center" }}>
									Enter the verification number that was sent
									to {phoneNumber}
								</Text>
							</Stack>
							<Spacer size={30} />
							<HStack
								justifyContent={"space-between"}
								style={{ paddingHorizontal: 30 }}
							>
								{/* <Number number={} /> */}
							</HStack>
						</Stack>
						<Box mb={-6} paddingX={"5%"}>
							<PrimaryButton
								text={"Confirm"}
								press={onConfirmCode}
							/>
						</Box>
					</Box>
				</Stack>
			</Stack>
			<Stack alignItems="center" marginBottom={5}>
				<Text color="#2AD3E7">Resend (00:39)</Text>
			</Stack>
		</ScrollView>
	);
};
