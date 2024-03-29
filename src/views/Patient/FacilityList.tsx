import React, { useState } from "react";
import {
	HStack,
	VStack,
	ScrollView,
	ArrowBackIcon,
	useToast,
	Modal,
	Button,
	Spacer,
	Spinner,
	Stack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import MainContainer from "../../components/containers/MainContainer";
import { IconContainer } from "../../components/misc";
import { Pressable, TouchableOpacity } from "react-native";

import { useQuery } from "react-query";
import { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppointmentCustomizer, {
	completeScheduleAtom,
} from "../../components/appointment-customizer";
import { useAtom, atom } from "jotai";

import { HomeNavKey } from ".";
import { Facility } from "../../types";
import { FacilityListItem } from "../../components/facilities-list-item";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setFacility } from "../../store/slices/appointment";
import { colors } from "../../constants/colors";
import { getFacilities } from "../../api";
import FilterIcon from "../../assets/icons/FilterIcon"
import BellIcon from "../../assets/icons/Bell"
import { PrimaryButton } from "../../components/button";
import { Text } from "../../components/text";


const FacilityList = () => {
	const navigation = useNavigation();
	const Toast = useToast();
	const [modalVisible, setModalVisible] = React.useState(false);

	const [speciality] = useSelector(
		({ appointment }: RootState) => [
			appointment.speciality
		]
	);

	const dispatch = useDispatch();

	const selectFacility = (facility: Facility) => {
		dispatch(setFacility(facility));
		navigation.navigate(HomeNavKey.FacilityInfo);
	};

	const {
		data: facilities,
		error,
		isLoading,
	} = useQuery<Facility[]>(
		["facilities", speciality],
		() => getFacilities({ speciality })
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

	// console.log("All facilities ");
	// console.log(JSON.stringify(facilities, null, 3));

	const openFilterModal = () => {
		setModalVisible(true)
		console.log("Open modal")
	}

	return (
		<>
			<Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header>Filters</Modal.Header>
					<Modal.Body>
						<AppointmentCustomizer />
					</Modal.Body>
					<Modal.Footer>


						<PrimaryButton
							flex="1"
							onPress={() => {
								setModalVisible(false);
							}}>
							<Text tx="common.close" color="white">
								Close
							</Text>
						</PrimaryButton>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
			<MainContainer
				title="facilitiList.selectFacility"
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
				rightSection={
					() => {
						return (
							<Stack mt={0}>
								<IconContainer>
									<TouchableOpacity onPress={() => {
										openFilterModal()
									}}>
										<FilterIcon size={6} color={"#561BB3"} />
									</TouchableOpacity>
								</IconContainer>
							</Stack>

						)
					}
				}
			>




				<ScrollView
					padding={5}
					contentContainerStyle={{ paddingBottom: 16 }}
					testID={"ConsultantList"}
					backgroundColor="#F4F6FA"
				>

					<Spacer size={0} />

					{/* TODO: ADD THE TEXT TO THE I18N FOLDER FOR DIFFERENT LANGUAGES */}
					{error &&
						<HStack justifyContent="space-between" shadow={2} borderRadius={8} backgroundColor={"#FFFFFF"} px={3} py={4}>
							<Text
							//  tx="home.schedule" color="white"
							>
								Something went wrong,Please try again
							</Text>
						</HStack>
					}
					{isLoading && <Spinner color={colors.primary} size="lg" />}
					{(!isLoading && facilities?.length == 0) &&
						<HStack justifyContent="space-between" shadow={2} borderRadius={8} backgroundColor={"#FFFFFF"} px={3} py={4}>
							<Text>
								No Facility with the selected speciality : {speciality}
							</Text>
						</HStack>

					}
					{facilities && (
						<VStack space={4}>
							{facilities.map((facility, ix) => {
								return (
									<TouchableOpacity
										key={facility.id}
										activeOpacity={0.5}
										onPress={() => selectFacility(facility)}
									>
										<FacilityListItem facility={facility} />
									</TouchableOpacity>
								);
							})}
						</VStack>
					)}
				</ScrollView>

			</MainContainer>
		</>
	);
};

const ModalActions: React.FC = () => {
	const [info] = useAtom(completeScheduleAtom);

	const viewDetailsAndMore = () => {
		console.log("Info", info);
	};
	return (
		<HStack space={2}>
			<Button flex={1} onPress={() => { }}>
				Cancel
			</Button>
			<Button flex={1} onPress={viewDetailsAndMore}>
				Update
			</Button>
		</HStack>
	);
};

const SelectionDetails = () => {
	const [showModal, setShowModal] = useState(false);
	const [type, location, speciality] = useSelector(
		({ appointment }: RootState) => [
			appointment.type,
			appointment.location,
			appointment.speciality,
		]
	);
	return (
		<HStack justifyContent="space-between">
			<VStack>
				<Text>Appointment Type: {type}</Text>
				<Text>Location: {location}</Text>
				<Text>Specialities: {speciality}</Text>
			</VStack>

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

export default FacilityList;
