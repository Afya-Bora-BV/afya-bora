import { useNavigation } from "@react-navigation/core";
import { Box, ScrollView, Stack, StatusBar, VStack } from "native-base";
import React from "react";
import { FacilityListItem } from "../components/facilities-list-item";
import { HeaderWith2Icons } from "../components/header";
import { facilities } from "../data/facilities";

export const FindFacilityList = () => {
	const navigation = useNavigation();

	const nav = () => {
		navigation.navigate("Home");
	};

	const nearest = () => { };

	const selectFacility = (facility) =>
		navigation.navigate("SetAppointmentTime", { facility });
	return (
		<ScrollView>
			<Stack>
				<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
				<VStack p={2} space={6}>
					{/* TODO: to be moved to components folder */}
					<HeaderWith2Icons
						text={"Select Hospital"}
						rText={"Nearest"}
						iconPress={nav}
						onPress={nearest}
					/>

					<VStack space={2}>
						{facilities.map((facility) => (
							<FacilityListItem
								onPress={() => selectFacility(facility)}
								key={facility.id}
								facility={facility}
							/>
						))}
					</VStack>
				</VStack>
			</Stack>
		</ScrollView>
	);
};

export default FindFacilityList