import React, { useCallback } from "react";
import {
	ArrowBackIcon,
	Button,
	Center,
	Pressable,
	ScrollView,
	Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { HomeNavKey } from ".";
import { colors } from "../../../constants/colors";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";

const ConfirmButton = () => {
	const navigation = useNavigation();
	const onPressNext = useCallback(() => {
		navigation.navigate(HomeNavKey.HomeScreen);
	}, []);
	return (
		<Button mb={3} bg={colors.primary} onPress={onPressNext} rounded={20}>
			Confirm Appointment Request
		</Button>
	);
};

const AppointmentInvoice = () => {
	const navigation = useNavigation();
	return (
		<MainContainer
			title="Invoice"
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
			<ScrollView>
				<Text>Invoice Stuff</Text>
				<Text fontSize={"md"} color={"#B0B3C7"} textAlign="center">
					*By confirming this appointment request, you agree to pay
					the above amount prior to your appointment.
				</Text>
				<ConfirmButton />
			</ScrollView>
		</MainContainer>
	);
};

export default AppointmentInvoice;
