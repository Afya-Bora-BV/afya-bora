import {
	Box,
	ScrollView,
	Stack,
	Text,
	Input,
	Select,
	CheckIcon,
	View,
	Pressable,
	HStack,
	Button,
	useToast,
} from "native-base";
import React, { useState } from "react";
import { PicAvatar } from "../../components/avatar";
import { Spacer } from "../../components/Spacer";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import {
	Dimensions,
	StatusBar,
	Platform,
	TouchableOpacity,
	Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PrimaryButton } from "../../components/button";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import firestore from "@react-native-firebase/firestore";
import { useMutation } from "react-query";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import axios, { AxiosResponse } from "axios";
import { API_ROOT } from "../../api";
import { useAtom } from "jotai";
import profile, {
	setProfile as updateReduxProfile,
} from "../../store/slices/profile";

import { HomeNavKey } from ".";
import { updateAppointmentInProgressAtom } from "./PatientComplaint";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
const regions: { name: string }[] = [
	"Residency Location",
	"Arusha",
	"Dar es Salaam",
	"Dodoma",
	"Geita",
	"Iringa",
	"Kagera",
	"Katavi",
	"Kigoma",
	"Kilimanjaro",
	"Lindi",
	"Manyara",
	"Mara",
	"Mbeya",
	"Morogoro",
	"Mtwara",
	"Mwanza",
	"Njombe",
	"Pemba North",
	"Pemba South",
	"Pwani",
	"Rukwa",
	"Ruvuma",
	"Shinyanga",
	"Simiyu",
	"Singida",
	"Tabora",
	"Tanga",
	"Zanzibar North",
	"Zanzibar South and Central",
	"Zanzibar West",
].map((region) => ({ name: region }));

const bloodGroups: { name: string }[] = [
	"A+",
	"B+",
	"AB+",
	"O+",
	"A-",
	"B-",
	"AB-",
	"O-",
].map((bloodGroup) => ({ name: bloodGroup }));

type Profile = CompleteProfileInputs & {
	phoneNumber: string;
};

interface ServerResponse {
	data: ServerData;
}

interface ServerData {
	message: string;
	patientId: string;
}

const createPatientProfile = async (profile: Profile): Promise<any> => {
	const uid = await auth().currentUser?.uid;
	const createdProfile = await axios.post<AxiosResponse<ServerResponse>>(
		`${API_ROOT}/v0/user/${uid}/profile/create/patient`,
		profile
	);

	console.log(" created profile ");
	console.log(createdProfile?.data);
	return createdProfile?.data;
};

//yup form control attrib
interface CompleteProfileInputs {
	name: string;
	phone: string;
	gender: "male" | "female";
	dob: Date;
	height: number;
	weight: number;
	bloodGroup: string;
	location: string;
	type: "doctor" | "patient" | "admin";
}

export default function CreateProfileScreen() {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");
	const phoneNumber = auth().currentUser?.phoneNumber;


	const Toast = useToast();

	const { signOut,setProfile } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CompleteProfileInputs>({
		// resolver: yupResolver(schema),
	});

	const confirmSignout = () => {
		Alert.alert(
			"Confirm",
			"You are about to sign out and switch accounts.",
			[
				{ text: "Cancel" },
				{
					text: "Confirm",
					onPress: () =>
						signOut().then(() =>
							navigation.navigate(HomeNavKey.HomeScreen)
						),
				},
			]
		);
	};

	const onSubmit = (data: CompleteProfileInputs) => {
		console.log("Form data : ");
		console.log(data);
		completProfile({ ...data, phoneNumber, type: "patient" });
	};

	const handleCreatingProfile = async (data: any) => {
		try {
			const uid = await auth().currentUser?.uid;
			const createdProfile = await createPatientProfile({
				...data,
				phoneNumber,
				type: "patient",
			});
			// TODO: to reconsider better way to store this server state
			if (createdProfile.patientId) {
				setProfile({
					id: createdProfile.patientId,
					...data,
					type: "patient",
				})

			} else {
				console.log("Error in creating profile data");
			}
		} catch (e) {
			throw new Error("Error in creating profile");
		}
	};

	//Date picker attrib
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date(1598051730000));

	const showDatepicker = () => {
		setShow(true);
	};

	const { isLoading, mutate: completProfile } = useMutation(
		handleCreatingProfile,
		{
			onError: (error, variables, context) => {
				// An error happened!
				console.log(`rolling back optimistic update with id `, error);
				Toast.show({ title: "Error in creating profile" });
			},
			onSuccess: (data, variables, context) => {
				// Boom baby!
				console.log("created successfully ");
				Toast.show({ title: "Successfuly created prifle" });

				navigation.dispatch(
					CommonActions.reset({
						index: 0,
						routes: [{ name: HomeNavKey.HomeScreen }],
					})
				);
			},
		}
	);

	return (
		<Box flex={1}>
			<StatusBar translucent backgroundColor={colors.primary} />
			<ScrollView>
				<Stack
					backgroundColor={colors.primary}
					borderBottomRadius={36}
					height={height / 2.2}
					position="absolute"
					top={0}
					left={0}
					right={0}
				></Stack>
				<Stack paddingBottom={10}>
					{/* <Stack alignItems="center" style={{ paddingVertical: 10 }}> */}
					<View
						justifyContent="center"
						alignItems="center"
						paddingY={20}
					>
						<Text color="white" fontSize={24}>
							Complete Profile
						</Text>
					</View>
					{/* </Stack> */}
					<Stack alignItems="center">
						<Box bg="white" shadow={2} rounded={10} width="90%">
							<Box position="absolute" right={5} top={5}>
								<TouchableOpacity
									style={{
										flexDirection: "row-reverse",
										alignItems: "center",
									}}
									activeOpacity={0.5}
									onPress={confirmSignout}
								>
									<Icon name="exit-run" size={24} />
									<Text textAlign="left">Sign Out </Text>
								</TouchableOpacity>
							</Box>
							<Stack mt={-10}>
								<PicAvatar />
							</Stack>

							<Stack>
								<Stack
									style={{
										paddingHorizontal: 20,
										paddingTop: 20,
										paddingBottom: 40,
									}}
								>
									<Stack>
										<Text>First & Last Name</Text>

										<Controller
											control={control}
											render={({
												field: {
													onChange,
													onBlur,
													value,
												},
											}) => (
												<Input
													value={value}
													onBlur={onBlur}
													onChangeText={(value) =>
														onChange(value)
													}
													outlineColor={
														errors.name ? "red" : ""
													}
													variant="rounded"
													placeholder="Name"
													autoCapitalize={"words"}
												/>
											)}
											name="name"
											defaultValue=""
										/>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Gender</Text>

										<Controller
											control={control}
											render={({
												field: {
													onChange,
													onBlur,
													value,
												},
											}) => (
												<Select
													variant="rounded"
													selectedValue={value}
													minWidth={200}
													accessibilityLabel="Gender"
													placeholder="Gender"
													onValueChange={(
														itemValue
													) => onChange(itemValue)}
													_selectedItem={{
														bg: "cyan.600",
														endIcon: (
															<CheckIcon
																size={4}
															/>
														),
													}}
												>
													<Select.Item
														label="Male"
														value="male"
													/>
													<Select.Item
														label="Female"
														value="female"
													/>
												</Select>
											)}
											name="gender"
											defaultValue="male"
										/>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Date of Birth</Text>
										<Controller
											control={control}
											render={({
												field: {
													onChange,
													onBlur,
													value,
												},
											}) => (
												<>
													<Input
														// keyboardType={""}
														value={moment(
															value
														).format(
															"DD MMMM YYYY"
														)}
														variant="rounded"
														placeholder="28-10-2021"
														style={{
															flex: 1,
														}}
														onFocus={showDatepicker}
														onChangeText={(
															value
														) => { }}
														// outlineColor={
														// 	errors.dateOfBirth
														// 		? "red"
														// 		: colorGrey
														// }
														InputRightElement={
															<Pressable
																onPress={() => {
																	showDatepicker;
																}}
															>
																{/* <MaterialCommunityIcons
																	name="calendar"
																	size={24}
																	color={
																		colors.primary
																	}
																	style={{
																		paddingEnd: 10,
																	}}
																/> */}
															</Pressable>
														}
													/>
													{show && (
														<DateTimePicker
															placeholderText="Select date"
															onChange={(
																event: Event,
																selectedDate:
																	| Date
																	| undefined
															) => {
																const currentDate =
																	selectedDate ||
																	date;
																setShow(
																	Platform.OS ===
																	"ios"
																);
																onChange(
																	currentDate
																);
															}}
															value={value}
															mode="date"
															display="spinner"
															maximumDate={
																new Date()
															}
														/>
													)}
												</>
											)}
											name="dob"
											defaultValue={date}
										/>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<HStack justifyContent="space-between">
											<Stack flex={1}>
												<Text>Height (cm)</Text>
												<Controller
													control={control}
													render={({
														field: {
															onChange,
															onBlur,
															value,
														},
													}) => (
														<Input
															value={`${value}`}
															onBlur={onBlur}
															keyboardType="name-phone-pad"
															onChangeText={(
																value
															) =>
																onChange(value)
															}
															outlineColor={
																errors.name
																	? "red"
																	: ""
															}
															variant="rounded"
															placeholder="0"
															autoCapitalize={
																"words"
															}
															InputRightElement={
																<Text
																	paddingRight={
																		2
																	}
																>
																	cm
																</Text>
															}
														/>
													)}
													name="height"
													// rules={{ required: true }}
													defaultValue={0}
												/>
											</Stack>

											<Spacer size={10} horizontal />

											<Stack flex={1}>
												<Text>Weight (kg)</Text>

												<Controller
													control={control}
													render={({
														field: {
															onChange,
															onBlur,
															value,
														},
													}) => (
														<Input
															value={`${value}`}
															onBlur={onBlur}
															keyboardType="name-phone-pad"
															onChangeText={(
																value
															) =>
																onChange(value)
															}
															outlineColor={
																errors.name
																	? "red"
																	: ""
															}
															variant="rounded"
															placeholder="0"
															autoCapitalize={
																"words"
															}
															InputRightElement={
																<Text
																	paddingRight={
																		2
																	}
																>
																	kg
																</Text>
															}
														/>
													)}
													name="weight"
													// rules={{ required: true }}
													defaultValue={0}
												/>
											</Stack>
										</HStack>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Blood Group</Text>

										<Controller
											control={control}
											render={({
												field: {
													onChange,
													onBlur,
													value,
												},
											}) => (
												<Select
													variant="rounded"
													selectedValue={value}
													minWidth={200}
													accessibilityLabel="BloodGroup"
													placeholder="BloodGroup"
													onValueChange={(
														itemValue
													) => onChange(itemValue)}
													_selectedItem={{
														bg: "cyan.600",
														endIcon: (
															<CheckIcon
																size={4}
															/>
														),
													}}
												>
													{bloodGroups.map(
														(bloodGroup) => (
															<Select.Item
																key={
																	bloodGroup.name
																}
																label={
																	bloodGroup.name
																}
																value={
																	bloodGroup.name
																}
															/>
														)
													)}
												</Select>
											)}
											name="bloodGroup"
											// rules={{ required: true }}
											defaultValue=""
										/>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Location of Residence</Text>

										<Controller
											control={control}
											render={({
												field: {
													onChange,
													onBlur,
													value,
												},
											}) => (
												<Select
													variant="rounded"
													selectedValue={value}
													minWidth={200}
													accessibilityLabel="Location"
													placeholder="Location"
													onValueChange={(
														itemValue
													) => onChange(itemValue)}
													_selectedItem={{
														bg: "cyan.600",
														endIcon: (
															<CheckIcon
																size={4}
															/>
														),
													}}
												>
													{regions.map((region) => (
														<Select.Item
															label={region.name}
															value={region.name}
														/>
													))}
												</Select>
											)}
											name="location"
											// rules={{ required: true }}
											defaultValue=""
										/>
									</Stack>
								</Stack>
							</Stack>
							<Box mb={-6} paddingX={"5%"}>
								<Button
									onPress={handleSubmit(onSubmit)}
									testID="button1"
									disabled={isLoading}
									isLoading={isLoading}
									borderRadius={20}
									_disabled={{
										backgroundColor: "#B0B3C7",
										color: "white",
									}}
									style={{ backgroundColor: colors.primary }}
									_text={{ color: "white" }}
								>
									Create profile
								</Button>
							</Box>
						</Box>
					</Stack>
				</Stack>
			</ScrollView>
		</Box>
	);
}
