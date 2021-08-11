import { useNavigation, useRoute } from "@react-navigation/native";
import {
	Text,
	Avatar,
	Box,
	Heading,
	HStack,
	VStack,
	Pressable,
	Stack,
	ArrowBackIcon,
} from "native-base";
import React from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ClipboardPulseIcon from "../../../assets/icons/ClipboardPulseIcon";
import HeartPulseIcon from "../../../assets/icons/HeartPulseIcon";
import WalletIcon from "../../../assets/icons/WalletIcon";
import MainContainer from "../../../components/containers/MainContainer";
import { Spacer } from "../../../components/Spacer";
import { IconContainer } from "../../../components/misc";
import BackIcon from "../../../assets/icons/BackIcon";
import { PrimaryButton } from "../../../components/button";
import { useAtom } from "jotai";
import { setSelectedFacilityAtom } from "./FacilityList";
import { FacilityListItem } from "../../../components/facilities-list-item";
import { FacilityDetails } from "../../../components/facilities-details";
import { HomeNavKey } from ".";

const FacilityComponent = () => {
	const navigation = useNavigation();
	const [facility, setFacility] = useAtom(setSelectedFacilityAtom);
	if (!facility) return null;
	return <FacilityDetails facility={facility}/>;
};

const FacilityInfo: React.FC = () => {
	const navigation = useNavigation();
	return (
		<MainContainer
			title={"Selected Facility"}
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
					<FacilityComponent />
				</Stack>

				<Stack px={10}>
					<PrimaryButton
						onPress={() => {
							navigation.navigate(HomeNavKey.AppointmentTime);
						}}
					>
						Schedule Appointment
					</PrimaryButton>
				</Stack>
			</ScrollView>
		</MainContainer>
	);
};

export default FacilityInfo;
