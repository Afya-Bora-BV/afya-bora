import React from "react";
import {
	Heading,
	HStack,
	VStack,
	Text,
	ScrollView,
	StatusBar,
} from "native-base";
import { ConsultantListItem } from "../../../components/consultant-list-item";
import { useNavigation } from "@react-navigation/native";
import { consultants } from "../../../data/consultants";
import { HeaderWith2Icons } from "../../../components/header";

import { NavKey } from ".";

const ConsultantsList = () => {
	const navigation = useNavigation();

	const navigateBack = () => {
		navigation.goBack();
	};

	const selectConsultant = (consultant: any) =>
		navigation.navigate(NavKey.SetAppointmentTimeScreen, { consultant });
	return (
		<ScrollView paddingTop={8}>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<VStack p={2} space={6}>
				{/* TODO: to be moved to components folder */}
				<HeaderWith2Icons
					text={"Choose a Consultant"}
					rText={"Nearest"}
					iconPress={navigateBack}
					// onPress={nearest}
				/>

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
		</ScrollView>
	);
};

export default ConsultantsList;
