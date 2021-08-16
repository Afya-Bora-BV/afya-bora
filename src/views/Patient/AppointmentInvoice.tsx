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
import { colors } from "../../constants/colors";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import { requestAppointment } from "../../api";

// const ConfirmButton = () => {
// 	const navigation = useNavigation();

// 	return (

// 	);
// };

const AppointmentInvoice = () => {
	const navigation = useNavigation();

	const onPressNext = useCallback(() => {
		const req = requestAppointment({
			aboutVisit: { complaint: "here", symptoms: ["fever"] },
			fid: "WOm1DbyIpAzzW8FV6ipw",
			pid: "0AXHzG9KcseAa9e02GWS",
			timeRange: "morning",
			type: "in-person",
		});

		console.log(req);
		// navigation.navigate(HomeNavKey.HomeScreen);
	}, []);
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
				<Button
					mb={3}
					bg={colors.primary}
					onPress={onPressNext}
					rounded={20}
				>
					Confirm Appointment Request
				</Button>
			</ScrollView>
		</MainContainer>
	);
};

export default AppointmentInvoice;
