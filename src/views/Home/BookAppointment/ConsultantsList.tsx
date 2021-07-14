import React from "react";
import {
	Heading,
	HStack,
	VStack,
	Text,
	ScrollView,
	StatusBar,
	ArrowBackIcon,
} from "native-base";
import { ConsultantListItem } from "../../../components/consultant-list-item";
import { useNavigation } from "@react-navigation/native";
import { consultants } from "../../../data/consultants";
import { HeaderWith2Icons } from "../../../components/header";

import { NavKey } from ".";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { Pressable } from "react-native";
import { useCallback } from "react";

const ConsultantsList = () => {
	const navigation = useNavigation();

	const selectConsultant = useCallback((consultant: any) => {
		navigation.navigate(NavKey.SetAppointmentTimeScreen, { consultant })
	}, [navigation])

	return (
		<MainContainer
			title="Choose a consultant"
			leftSection={
				// Go back if can go back
				navigation.canGoBack() ? (
					() => (
						<Pressable onPress={() => navigation.goBack()}>
							<IconContainer>
								<ArrowBackIcon size={6} color="#561BB3" />
							</IconContainer>
						</Pressable>
					)
				) : undefined
			}>
			<ScrollView padding={5}>
				<VStack space={2}>
					{consultants.map((consultant) => (
						<ConsultantListItem
							onPress={() => selectConsultant(consultant)}
							key={consultant.id}
							consultant={consultant}
						/>
					))}
				</VStack>
			</ScrollView>
		</MainContainer>
	);
};

export default ConsultantsList;
