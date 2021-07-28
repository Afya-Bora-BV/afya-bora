import { ArrowBackIcon, View, VStack } from "native-base";
import { Text } from "react-native-svg";
import React from "react";
import MainContainer from "../../../../components/containers/MainContainer";
import { StatusAppointmentAlert } from "../../../../components/core/appointment";
import { Pressable } from "react-native";
import { IconContainer } from "../../../../components/misc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAppointmentDetails } from "../../Home/AppointmentInfo";

export default function AppointmentSpecifics(){
    const navigation = useNavigation();

	const route = useRoute();
	
	return (
		<MainContainer
			title="Appointment Info"
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
			<VStack
				flex={1}
				width="100%"
				paddingX={5}
				space={5}
				marginTop={5}
				marginBottom={10}
			>
				{/* NOTE: This is supposed to render.... regardless */}
				{/* <DateTimeCardRender /> */}
				<View width="100%">
					<StatusAppointmentAlert
						time={""}
						
					/>
				</View>
			</VStack>
		</MainContainer>
	);
}