import { useNavigation, useRoute } from "@react-navigation/native";
import {
	Pressable,
	Stack,
	ArrowBackIcon,
} from "native-base";
import React from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import MainContainer from "../../components/containers/MainContainer";
import { Spacer } from "../../components/Spacer";
import { IconContainer } from "../../components/misc";
import BackIcon from "../../assets/icons/BackIcon";
import { PrimaryButton } from "../../components/button";
import { FacilityDetails } from "../../components/facilities-details";
import { HomeNavKey } from ".";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Text } from "../../components/text";

const FacilityInfo: React.FC = () => {
	const facility = useSelector(
		({ appointment }: RootState) => appointment.facility
	);

	console.log(facility);
	const navigation = useNavigation();
	return (
		<MainContainer
			title="facilitiList.selectFacility"
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
				<Stack p={5}>
					{facility && <FacilityDetails facility={facility} />}
				</Stack>

				<Stack px={10}>
					<PrimaryButton
						onPress={() => {
							navigation.navigate(HomeNavKey.AppointmentTime);
						}}
					>
						<Text tx="facilityInfo.scheduleAppointment" color="white">Schedule Appointment</Text>
					</PrimaryButton>
				</Stack>
			</ScrollView>
		</MainContainer>
	);
};

export default FacilityInfo;
