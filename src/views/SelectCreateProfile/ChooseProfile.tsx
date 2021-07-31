import React from "react";
import {
	Box,
	Center,
	Heading,
	HStack,
	Spinner,
	Text,
	VStack,
	ScrollView,
} from "native-base";
import auth from "@react-native-firebase/auth";
import {
	Consultant,
	Patient,
	useAuthStore,
} from "../../internals/auth/context";
import { API_ROOT } from "../../api";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import firestore from "@react-native-firebase/firestore";
import { Pressable } from "react-native";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavKeys } from "./";
import { Spacer } from "../../components/Spacer";

type Data = {
	count: number;
	data: any[];
};
type ProfileResponse = {
	data: Data;
	status: any;
	statusText: any;
	headers: any;
	config: any;
};

export const checkPatientProfiles = async (): Promise<Patient[]> => {
	const uid = await auth().currentUser?.uid;
	console.log("Checking user profile data");
	console.log(`${API_ROOT}/v0/user/${uid}/profile/patients`);
	const profiles = await axios.get(
		`${API_ROOT}/v0/user/${uid}/profile/patients`
	);
	return profiles.data.data;
};

const checkConsultantProfiles = async (): Promise<Consultant[]> => {
	const uid = await auth().currentUser?.uid;
	const profile = await firestore()
		.collection("consultants")
		.where("uid", "==", uid)
		.get();
	const data = profile.docs.map(
		(doc) => ({ ...doc.data(), id: doc.id, uid: uid } as Consultant)
	);
	return data;
};

const ChooseProfile = () => {
	const email = auth().currentUser?.email;
	const phone = auth().currentUser?.phoneNumber;
	const uid = auth().currentUser?.uid;

	const navigation = useNavigation();
	const { profileType, updateProfile } = useAuthStore((state) => ({
		profileType: state.profileType,
		updateProfile: state.updateProfile,
	}));

	const {
		status,
		data: profiles,
		error,
		isLoading,
	} = useQuery<Consultant[] | Patient[] | undefined>(
		["chooseProfile", email, phone],
		() => {
			if (phone) return checkPatientProfiles();
			if (email) return checkConsultantProfiles();
		}
	);

	console.log("Profile type : ", profileType);
	console.log("Email : ", email, " Phone : ", phone);

	console.log("User profiles : ", profiles);

	const updateProfileDetails = (profile: any) => {
		console.log("Setting profile to ", profile);
		if (phone) {
			updateProfile({ ...profile, uid: uid, type: "patient" });
		}
		if (email) {
			updateProfile({ ...profile, uid: uid, type: "doctor" });
		}
	};
	if (error) {
		return (
			<Center flex={1}>
				<Text>Something went wrong {JSON.stringify(e)}</Text>
			</Center>
		);
	}
	if (isLoading) {
		return (
			<Center flex={1}>
				<Spinner size="lg" />
			</Center>
		);
	}

	if (_.isEmpty(profiles)) {
		console.log("What cant navigate ");
	}

	const handleCreateNewProfile = () => {
		navigation.navigate(ProfileNavKeys.CreateProfileScreen);
	};

	return (
		<ScrollView p={5} flex={1}>
			<VStack space={4}>
				<Heading textAlign="center">Seems like you’ve been here!</Heading>
				<Text textAlign="center">
					It appears that’ve you had registered once before. Please
					choose a profile to proceed with:
				</Text>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					alwaysBounceHorizontal
				>
					<HStack space={2} p={3}>
						{profiles?.map((profile) => {
							return (
								<VStack>
									<Center>
										<Pressable
											onPress={() =>
												updateProfileDetails(profile)
											}
										>
											<VStack
												h={48}
												w={48}
												p={5}
												rounded={20}
												shadow={2}
												bg="white"
											>
												<Heading>{profile.id}</Heading>
											</VStack>
										</Pressable>
									</Center>
								</VStack>
							);
						})}
					</HStack>
				</ScrollView>
				<VStack p={3}>
					<Pressable
						onPress={() => {
							console.log("Create Profile");
							handleCreateNewProfile();
						}}
					>
						<VStack
							h={48}
							width="100%"
							p={5}
							bg="#F0F0F0"
							rounded={20}
							shadow={2}
						>
							<Center flex={1}>
								<Text>Create Profile + </Text>
							</Center>
						</VStack>
					</Pressable>
				</VStack>
			</VStack>
		</ScrollView>
	);
};

export default ChooseProfile;
