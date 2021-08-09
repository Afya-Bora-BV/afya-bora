import React, { useState } from "react";
import {
	Heading,
	HStack,
	VStack,
	Text,
	ScrollView,
	StatusBar,
	ArrowBackIcon,
	useToast,
	Modal,
	Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ConsultantListItem } from "../../../../components/consultant-list-item";
import { NavKey } from "./_navigator";
import MainContainer from "../../../../components/containers/MainContainer";
import { IconContainer } from "../../../../components/misc";
import { Pressable, ProgressBarAndroidBase } from "react-native";
import { useCallback } from "react";

import firestore from "@react-native-firebase/firestore";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { API_ROOT } from "../../../../api";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Consultant {
	id: string;
	name: string;
	gender: "male" | "female";
	facility: { name: string; address: string };
	clinicianType: string;
	specialities: string[];
	rating: number;
	ratedBy: number;
}

export const getConsultants = async (): Promise<Consultant[]> => {
	console.log("Get consultant list ", `${API_ROOT}/v0/data/consultants`);
	const res = await axios.get<Consultant[]>(
		`${API_ROOT}/v0/data/consultants`
	);
	const consultants: Consultant[] = await res.data.data;
	return consultants;
};

const ConsultantsList = () => {
	const navigation = useNavigation();
	const Toast = useToast();

	const selectConsultant = useCallback(
		(consultant: any) => {
			navigation.navigate(NavKey.SetAppointmentTimeScreen, {
				consultant,
			});
		},
		[navigation]
	);

	const { data: consultants, error } = useQuery(
		["consultants"],
		getConsultants
	);

	useEffect(() => {
		if (error !== undefined && error !== null) {
			console.error(error);
			// Show message
			Toast.show({
				title: "Unable to load results",
				description: String(error),
			});
		}
	}, [error]);

	// console.log({ ALL: consultants });
	console.log(JSON.stringify(consultants, null, 4));

	return (
		<MainContainer
			title="Select Facility"
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
			{consultants !== undefined ? (
				<ScrollView padding={5} testID={"ConsultantList"}>
					<SelectionDetails />
					<VStack space={2}>
						{consultants.map((consultant, ix) => {
							return (
								<ConsultantListItem
									onPress={() => selectConsultant(consultant)}
									key={consultant.name}
									consultant={consultant}
								/>
							);
						})}
					</VStack>
				</ScrollView>
			) : (
				<Text>Loading...</Text>
			)}
		</MainContainer>
	);
};

const SelectionDetails = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<HStack justifyContent="space-between">
			<VStack>
				<Text>Appointment Type:</Text>
				<Text>Location:</Text>
				<Text>Specialities:</Text>
			</VStack>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content maxWidth="400px">
					<Modal.CloseButton />
					<Modal.Header>Modal Title</Modal.Header>
					<Modal.Body></Modal.Body>
					<Modal.Footer>
						<Button.Group variant="ghost" space={2}>
							<Button>LEARN MORE</Button>
							<Button
								onPress={() => {
									setShowModal(false);
								}}
							>
								ACCEPT
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
			<Pressable onPress={() => setShowModal(true)}>
				<HStack borderRadius={20} bg="#F5F5F5" py={2} px={5}>
					<Text>Edit</Text>
					<MaterialCommunityIcons name="chevron-down" size={20} />
				</HStack>
			</Pressable>
		</HStack>
	);
};

export default ConsultantsList;
