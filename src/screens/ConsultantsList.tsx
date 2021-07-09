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

const ConsultantsList = () => {
	const navigation = useNavigation();

	const selectConsultant = (consultant) =>
		navigation.navigate("SetAppointmentTime", { consultant });
	return (
		<ScrollView paddingTop={12}>
			<StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
			<VStack p={2} space={6}>
				{/* TODO: to be moved to components folder */}
				<HStack justifyContent="space-between" alignItems="center">
					<IconContainer>
						<BackIcon size={22} color="#7065E4" />
					</IconContainer>
					<Heading fontSize="lg">Choose a Consultant</Heading>
					<HStack>
						<Text fontSize="sm">Nearest</Text>
					</HStack>
				</HStack>

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
