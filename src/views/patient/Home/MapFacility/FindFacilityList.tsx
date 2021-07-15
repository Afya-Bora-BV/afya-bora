import { useNavigation } from "@react-navigation/core";
import { Box, Heading, ScrollView, Stack, StatusBar, VStack } from "native-base";
import React, { useCallback } from "react";
import { ConsultantListItem } from "../../../../components/consultant-list-item";
import { FacilityListItem } from "../../../../components/facilities-list-item";
import { HeaderWithRText } from "../../../../components/header";
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
		<ScrollView>
			<Stack>
				{/* <StatusBar barStyle="dark-content" backgroundColor={"#fff"} /> */}
				<VStack p={2} space={6} paddingTop={8}>
					{/* TODO: to be moved to components folder */}
					<HeaderWithRText
						text={"Select Hospital"}
						rText={"Nearest"}
						iconPress={nav}
						onPress={nearest}
					/>

					<VStack space={2}>
						<FacilityListItem
							onPress={() => { }}
							key={facility.id}
							facility={facility}
						/>
					</VStack>
					<VStack space={3}>
						<Heading fontSize="md">Consultants at This Facility</Heading>
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
			</Stack>
		</ScrollView>
	);
};

export default FindFacilityList;
