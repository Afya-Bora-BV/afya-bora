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
import { useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../../../../components/consultant-list-item";
import { NavKey } from "./_navigator";
import MainContainer from "../../../../components/containers/MainContainer";
import { IconContainer } from "../../../../components/misc";
import { Pressable } from "react-native";
import { useCallback } from "react";

import firestore from "@react-native-firebase/firestore";
import { useQuery } from "react-query";

interface Consultant {
	cid: string;
	email: string;
	facilityId: string;
	gender: "male" | "female";
	name: string;
	rating: number;
	specialities: string[];
	ratedBy: number;
}

const getConsultants = async (): Promise<Consultant[]> => {
	const consultants = await firestore().collection("consultants").get();
	// TODO for reach for consulatant fetch  facility information, combined in batch read
	const data = consultants.docs.map(
		(doc) => ({ ...doc.data(), cid: doc.id } as Consultant)
	);
	return data;
};

const ConsultantsList = () => {
	const navigation = useNavigation();

	const selectConsultant = useCallback(
		(consultant: any) => {
			navigation.navigate(NavKey.SetAppointmentTimeScreen, {
				consultant,
			});
		},
		[navigation]
	);

	const {
		status,
		data: consultants,
		error,
		isLoading,
	} = useQuery(["consultants"], getConsultants);

	console.log("Status ", isLoading);
	console.log("Error ", error);
	console.log("Data ", consultants);

	return (
		<MainContainer
			title="Choose a consultant"
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
			<ScrollView padding={5}>
				<VStack space={2}>
					{isLoading && <Text>Loading...</Text>}
					{error && <Text>Something went wrong</Text>}
					{consultants?.map((consultant) => (
						<ConsultantListItem
							onPress={() => selectConsultant(consultant)}
							key={consultant.cid}
							consultant={consultant}
						/>
					))}
				</VStack>
			</ScrollView>
		</MainContainer>
	);
};

export default ConsultantsList;
