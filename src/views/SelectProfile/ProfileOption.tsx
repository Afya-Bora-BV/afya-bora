import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
	ArrowBackIcon,
	Box,
	Pressable,
	Stack,
	Text,
	VStack,
} from "native-base";
import MainContainer from "../../components/containers/MainContainer";
import { TouchableOpacity } from "react-native";
import { IconContainer } from "../../components/misc";

import { useAuthStore } from "../../internals/auth/context";

export default function ProfileOptions () {
	const navigation = useNavigation();
	const setProfile = useAuthStore(s => s.setProfile)
	const profiles = [
		{ 
			type: 'patient',
			profile: {
				title: "Patient",
				description: "Create a profile for a patient",
			}
		},
		{
			type: 'doctor',
			profile: {
				title: "Doctor",
				description: "Create a profile for a doctor",
			}
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
						<TouchableOpacity key={v.type} onPress={() => setProfile({ type: v.type as 'doctor' | 'patient' })}>
							<Box bg="#FFF" shadow={2} rounded={10} width="100%">
								<Stack padding={5}>
									<Text fontSize="xl" bold>
										{v.profile.title}
									</Text>
									<VStack>
										<Text color="#747F9E">
											{v.profile.description}
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
}
