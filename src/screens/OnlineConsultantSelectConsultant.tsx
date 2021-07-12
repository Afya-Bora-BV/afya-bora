import React from "react";
import { Box, VStack } from "native-base";
import { HeaderwithBack } from "../components/header";
import { useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../components/consultant-list-item";
import _ from "lodash";

type DemoConsultant = {
	id: string;
	name: string;
	hospital: string;
	region: string;
	expertise: string;
	rating: number;
	ratedBy: number;
	time: string;
	status: "online" | "offline";
};

const demoConsultants: DemoConsultant[] = [
	{
		id: "uindlxAa",
		name: "Ally Salim",
		hospital: "Aga Khan Hospital",
		region: "Arusha, Tanzania",
		expertise: "General Practitioner",
		rating: 4,
		ratedBy: 289,
		time: "1:00",
		status: "online",
	},
	{
		id: "uindlxAa",
		name: "Ally Salim",
		hospital: "Aga Khan Hospital",
		region: "Arusha, Tanzania",
		expertise: "General Practitioner",
		rating: 4,
		ratedBy: 289,
		time: "1:00",
		status: "offline",
	},
];

const FindFacility: React.FC = () => {
	const { goBack, navigate } = useNavigation();

	return (
		<VStack flex={1} py={8} px={4} position="relative">
			<VStack space={4}>
				<HeaderwithBack
					text="Choose a Consultant"
					onBackPress={() => goBack()}
				/>
				{demoConsultants.map((consultant) => (
					<ConsultantListItem
						onPress={() => navigate("PatientComplaint")}
						key={consultant.id}
						consultant={consultant}
					/>
				))}
			</VStack>
		</VStack>
	);
};

export default FindFacility;
