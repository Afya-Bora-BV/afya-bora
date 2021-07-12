import React from "react";
import {
	Heading,
	HStack,
	VStack,
	Text,
	ScrollView,
	StatusBar,
} from "native-base";
import IconContainer from "../components/icon-container";
import BackIcon from "../assets/icons/BackIcon";
import { ConsultantListItem } from "../components/consultant-list-item";
import { useNavigation } from "@react-navigation/native";
import { consultants } from "../data/consultants";
import { HeaderWith2Icons } from "../components/header";

const ConsultantsList = () => {
	const navigation = useNavigation();

	const nav = () => {
		navigation.navigate("Home");
	};

	const nearest = () => { };

	const selectConsultant = (consultant) =>
		navigation.navigate("SetAppointmentTime", { consultant });
	return (
		<ScrollView paddingTop={2}>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<VStack p={2} space={6}>
				{/* TODO: to be moved to components folder */}
				<HeaderWith2Icons
					text={"Choose a Consultant"}
					rText={"Nearest"}
					iconPress={nav}
					onPress={nearest}
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
