import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { ArrowBackIcon, Box, Heading, ScrollView, Stack, StatusBar, Text, VStack } from "native-base";
import React, { useCallback } from "react";
import { Pressable } from "react-native";
import { useQuery } from "react-query";
import { API_ROOT } from "../../../../api";
import { ConsultantListItem } from "../../../../components/consultant-list-item";
import MainContainer from "../../../../components/containers/MainContainer";
import { FacilityListItem } from "../../../../components/facilities-list-item";
import { HeaderWithRText } from "../../../../components/header";
import { IconContainer } from "../../../../components/misc";
import { consultants } from "../../../../data/consultants";
import { facilities } from "../../../../data/facilities";
import { NavKey as BookAppointmentNavKey } from "../BookAppointment/_navigator";
import { HomeNavKey as MainNavKey } from "../_navigator";


export interface Consultant {
	id: string
	name: string
	gender: "male" | "female"
	facility?: {
		id: string
		name: string
		address: string
	}
	clinicianType: string
	specialities: string[]
	rating: number
	ratedBy: number
}

export const getConsultantsByFacility = async (facilityId: string): Promise<Consultant[]> => {
	console.log("Get consultant at ", `${API_ROOT}/v0/data/consultants?fid=${facilityId}`)
	const res = await axios.get<Consultant[]>(`${API_ROOT}/v0/data/consultants?fid=${facilityId}`)
	const consultants: Consultant[] = await res.data.data
	console.log("Data found is ")
	console.log(consultants)
	return consultants
};

const ConsultantLists = ({ facilityId, selectConsultant }: { facilityId: string, selectConsultant: (id: Consultant) => void }) => {
	const {
		status,
		data: consultants,
		error,
		isLoading,
	} = useQuery(["consultants", facilityId], () => getConsultantsByFacility(facilityId));

	console.log("COnsultant in this facilities")
	console.log(JSON.stringify(consultants, null, 3))
	return (
		<VStack space={3} marginTop={10}>
			<Heading fontSize="xl">Consultants at This Facility</Heading>
			<VStack space={2}>
				{isLoading && !error && <Text>Loading ...</Text>}
				{consultants?.map((consultant) => (
					<ConsultantListItem
						onPress={() => selectConsultant(consultant)}
						key={consultant.id}
						consultant={consultant}
					/>
				))}
			</VStack>
		</VStack>
	)
}
const FindFacilityList = () => {
	const navigation = useNavigation();
	const route = useRoute();

	// TODO: fix type issue
	const facility = route.params.facility


	const nearest = () => { };

	const selectFacility = (facility: any) => navigation.navigate("SetAppointmentTime", { facility });

	// TODO: facility should come from map screen


	const selectConsultant = useCallback((consultant: any) => {
		navigation.navigate(MainNavKey.BookAppointmentViewScreen, {
			screen: BookAppointmentNavKey.SetAppointmentTimeScreen,
			params: { consultant },
		})
	}, [navigation])

	console.log("Passed facility is ", facility)
	console.log(typeof (facility)) 		//this is testing only nothing to do with code

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
				<ConsultantLists facilityId={facility.id} selectConsultant={selectConsultant} />
			</VStack>
		</MainContainer>
	);
};

export default FindFacilityList;
