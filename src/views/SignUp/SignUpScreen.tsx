import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Input, ScrollView, Spacer, Stack, Text } from "native-base";
import { PrimaryButton } from "../../components/button";
import { Header, HeaderwithBack } from "../../components/header";
import { TextInput } from "../../components/textFields";
import { colors } from "../../contants/colors";

// import auth from '@react-native-firebase/auth';
// import { useMutation } from 'react-query'
// import { ToastAndroid } from "react-native";

import { NavKey as SignUpNavKey } from '.'

export default function SignUp  ()  {
	const navigation = useNavigation();
	const [phoneNumber, setPhoneNumber] = useState('')

	// if (!confirm) {
	// 	return (
	// 	);
	// }

	return (
		<Stack>
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
				<Stack paddingY={10}>
					<Stack
						alignItems="center"
						style={{ paddingBottom: 80, paddingLeft: 25 }}
					>
						<HeaderwithBack
							text="Sign up"
							onBackPress={() => navigation.goBack()}
							color="white"
						/>
					</Stack>

					<Stack alignItems="center">
						<Box bg="white" shadow={2} rounded={10} width="90%">
							<Stack
								style={{
									paddingHorizontal: 20,
									paddingTop: 10,
									paddingBottom: 40,
								}}
							>
								<TextInput
									// flex={1}
									value={phoneNumber}
									onChangeText={setPhoneNumber}
									holderText={"Email or Phone Number"}
								/>
							</Stack>
							<Box mb={-6} paddingX={"5%"}>
								<PrimaryButton
									// isLoading={isLoading}
									// disabled={isLoading}
									text={"Confirm"}
									press={() => navigation.navigate(SignUpNavKey.VerifyScreen, { phoneNumber })}
								/>
							</Box>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>
		</Stack>
	)
};
