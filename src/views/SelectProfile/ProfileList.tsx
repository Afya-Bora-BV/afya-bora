import { useNavigation } from "@react-navigation/native";
import {
	ArrowBackIcon,
	Box,
	Icon,
	Pressable,
	Spacer,
	Stack,
	Text,
	VStack,
} from "native-base";
import React from "react";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";

import { TouchableOpacity } from "react-native";


export default function ProfileList () {
	const navigation = useNavigation();
	const profiles = [
		{ 
			type: 'patient',
			title: "Patient",
			description: "Create a profile for a patient",
		},
		{
			type: 'doctor',
			title: "Doctor",
			description: "Create a profile for a doctor",
		},
	]

	return (
		<MainContainer
			title="List of user profiles"
			leftSection={
				// Go back if can go back
				navigation.canGoBack()
					? () => (
							<Pressable onPress={() => navigation.goBack()}>
								<IconContainer>
									<ArrowBackIcon size={6} color="#561BB3" />
								</IconContainer>
							</Pressable>
					  )
					: undefined
			}
		>
			<VStack flex={1} space={5} paddingTop={10} paddingX={5}>
				{
					profiles.map((v) => (
						<TouchableOpacity key={v.type} onPress={() => console.log({ sds: "asdasd" })}>
							<Box bg="#E7E5FF" shadow={2} rounded={10} width="100%">
								<Stack padding={5}>
									<Text fontSize="xl" bold>
										The doctor has ended his consultation
									</Text>
									<VStack>
										<Text color="#747F9E">
											Your consultation is timed and finished, please rate
											us so we can serve you better!
										</Text>
									</VStack>
								</Stack>
							</Box>
						</TouchableOpacity>
					))
				}
			</VStack>
		</MainContainer>
	);
};