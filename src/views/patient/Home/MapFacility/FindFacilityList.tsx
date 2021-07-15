import { useNavigation } from "@react-navigation/core";
import { ArrowBackIcon, Box, Heading, ScrollView, Stack, StatusBar, VStack } from "native-base";
import React, { useCallback } from "react";
import { Pressable } from "react-native";
import { ConsultantListItem } from "../../../../components/consultant-list-item";
import MainContainer from "../../../../components/containers/MainContainer";
import { FacilityListItem } from "../../../../components/facilities-list-item";
import { HeaderWithRText } from "../../../../components/header";
import { IconContainer } from "../../../../components/misc";
import { consultants } from "../../../../data/consultants";
import { facilities } from "../../../../data/facilities";
import { NavKey as BookAppointmentNavKey } from "../BookAppointment/_navigator";
import { HomeNavKey as MainNavKey } from "../_navigator";

const FindFacilityList = () => {
	const navigation = useNavigation();

	const nav = () => {
		navigation.navigate("Home");
	};

	const nearest = () => { };

	const selectFacility = (facility: any) => navigation.navigate("SetAppointmentTime", { facility });

	// TODO: facility should come from map screen
	const facility = facilities[0]

	const selectConsultant = useCallback((consultant: any) => {
		navigation.navigate(MainNavKey.BookAppointmentViewScreen, {
			screen: BookAppointmentNavKey.SetAppointmentTimeScreen,
			params: { consultant },
		})
	}, [navigation])

	return (

		<MainContainer
			title="Select Hospital"
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
			<VStack space={6} padding={5} paddingTop={3}>
				<FacilityListItem
					onPress={() => { }}
					key={facility.id}
					facility={facility}
				/>
				<VStack space={3} marginTop={10}>
					<Heading fontSize="xl">Consultants at This Facility</Heading>
					<VStack space={2}>
						{consultants.map((consultant) => (
							<ConsultantListItem
								onPress={() => selectConsultant(consultant)}
								key={consultant.id}
								consultant={consultant}
							/>
						))}
					</VStack>
				</VStack>
			</VStack>
		</MainContainer>
	);
};

export default FindFacilityList;
