import {
	Box,
	ScrollView,
	Stack,
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
import {
	CommonActions,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { colors } from "../../constants/colors";
import {
	Dimensions,
	StatusBar,
	Platform,
	TouchableOpacity,
	Alert,
	ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PrimaryButton } from "../../components/button";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import firestore from "@react-native-firebase/firestore";
import { useMutation } from "react-query";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { HomeNavKey } from ".";
import { useAuth } from "../../contexts/AuthContext";
import functions from "@react-native-firebase/functions";
import { Picker } from "@react-native-picker/picker";
import { Text } from "../../components/text";

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
	"Blood Group",
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
	const { uid, phoneNumber } = await auth().currentUser!;

	try {
		const inf = await firestore().collection('patients').doc(uid).set({
			uid: uid,
			...profile,
		})
	} catch (e) {
		throw e
	}
	// await functions().httpsCallable("createNewProfile")({
	// 	uid: uid,
	// 	...profile,
	// });
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
	const { params } = useRoute();
	const { width, height } = Dimensions.get("screen");
	const phoneNumber = auth().currentUser?.phoneNumber;

	const Toast = useToast();

	const signOut = () => auth().signOut();

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
			await createPatientProfile({
				...data,
				phoneNumber,
				type: "patient",
			});
		} catch (e) {
			throw new Error("Error in creating profile");
		}
	};

	//Date picker attribute
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
				ToastAndroid.show(
					"Error in creating profile",
					ToastAndroid.SHORT
				);
			},
			onSuccess: (data, variables, context) => {
				// Boom baby!
				console.log("created successfully ");
				ToastAndroid.show(
					"successfully created profile",
					ToastAndroid.SHORT
				);

				if (params?.completingAppointment) {
					return navigation.navigate(HomeNavKey.ConfirmAppointment);
				}

				navigation.dispatch(
					CommonActions.reset({
						index: 1,
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
									<Icon name="exit-to-app" size={24} />
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
										<Text>Full Name</Text>

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

										<Stack
											borderWidth={1}
											borderColor="#DEDEDE"
											borderRadius={18}
										>
											<Controller
												control={control}
												render={({
													field: {
														onChange,
														onBlur,
														value,
													},
												}) => (
													<Picker
														selectedValue={value}
														onValueChange={(
															itemValue,
															itemIndex
														) =>
															onChange(itemValue)
														}
													>
														<Picker.Item
															label="Gender"
															value=""
														/>

														<Picker.Item
															label="Male"
															value="male"
														/>
														<Picker.Item
															label="Female"
															value="female"
														/>
													</Picker>
												)}
												name="gender"
												defaultValue="male"
											/>
										</Stack>
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

										<Stack
											borderWidth={1}
											borderColor="#DEDEDE"
											borderRadius={18}
										>
											<Controller
												control={control}
												render={({
													field: {
														onChange,
														onBlur,
														value,
													},
												}) => (
													<Picker
														selectedValue={value}
														onValueChange={(
															itemValue,
															itemIndex
														) =>
															onChange(itemValue)
														}
													>
														{bloodGroups.map(
															(bloodGroup) => {
																return (
																	<Picker.Item
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
																);
															}
														)}
													</Picker>
												)}
												name="bloodGroup"
												defaultValue=""
											/>
										</Stack>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Location of Residence</Text>

										<Stack
											borderWidth={1}
											borderColor="#DEDEDE"
											borderRadius={18}
										>
											<Controller
												control={control}
												render={({
													field: {
														onChange,
														onBlur,
														value,
													},
												}) => (
													<Picker
														selectedValue={value}
														onValueChange={(
															itemValue,
															itemIndex
														) =>
															onChange(itemValue)
														}
													>
														{regions.map(
															(region) => (
																<Select.Item
																	label={
																		region.name
																	}
																	key={
																		region.name
																	}
																	value={
																		region.name
																	}
																/>
															)
														)}
													</Picker>
												)}
												name="location"
												defaultValue=""
											/>
										</Stack>
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
