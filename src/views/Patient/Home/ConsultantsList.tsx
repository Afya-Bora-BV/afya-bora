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
import { ConsultantListItem } from "../../../components/consultant-list-item";
import MainContainer from "../../../components/containers/MainContainer";
import { IconContainer } from "../../../components/misc";
import { Pressable, ProgressBarAndroidBase } from "react-native";
import { useCallback } from "react";

import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { API_ROOT } from "../../../api";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppointmentCustomizer, { completeScheduleAtom } from "../../../components/appointment-customizer";
import { useAtom } from 'jotai'

import { HomeNavKey } from '.'

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
			navigation.navigate(HomeNavKey.AppointmentTime, {
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
					<VStack space={4}>
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
					</VStack>
				</ScrollView>
			) : (
				<Text>Loading...</Text>
			)}
		</MainContainer>
	);
};

const ModalActions: React.FC = () => {
	const [info] = useAtom(completeScheduleAtom)

	const viewDetailsAndMore = () => {
		console.log("Info", info)
	}
	return (
		<HStack space={2}>
			<Button flex={1} onPress={() => { }}>Cancel</Button>
			<Button flex={1} onPress={viewDetailsAndMore}>Update</Button>
		</HStack>
	)
}

const AppointmentSearchDetails = () => {
	const [info] = useAtom(completeScheduleAtom)
	return (
		<VStack>
			<Text>Appointment Type: {info.type}</Text>
			<Text>Location: {info.location}</Text>
			<Text>Specialities: {info.speciality}</Text>
		</VStack>
	)
}
const SelectionDetails = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<HStack justifyContent="space-between">
			<AppointmentSearchDetails />
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content maxWidth="400" p={12}>
					<VStack space={12}>
						<AppointmentCustomizer />
						<ModalActions />
					</VStack>
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
