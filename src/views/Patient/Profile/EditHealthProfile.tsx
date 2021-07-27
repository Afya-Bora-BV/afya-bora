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
} from "native-base";
import React, { useEffect, useState } from "react";
import { PicAvatar } from "../../../components/avatar";
import { Spacer } from "../../../components/Spacer";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../constants/colors";
import { Dimensions, StatusBar, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PrimaryButton } from "../../../components/button";
import moment from "moment";
import { useAuthStore } from "../../../internals/auth/context";

import firestore from "@react-native-firebase/firestore";
import { useMutation } from "react-query";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { PatientProfile } from "../../../types";

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

const createPatientProfile = async (profile: Profile) => {
	console.log("Creating a profile");
	console.log(profile);
	const profilesRef = firestore().collection("patients");
	const uid = await auth().currentUser?.uid;
	console.log("USER ID 2 : ", uid);
	await profilesRef.doc(uid).set({ ...profile, uid });
};

function friendlyFormatDate(timeStamp: Date | string | number) {
	const dateObj = new Date(timeStamp);

	const date = dateObj.getDate();
	const month = dateObj.getMonth();
	const year = dateObj.getFullYear();

	return `${date}-${month + 1}-${year}`;
}

//yup form control attrib
interface CompleteProfileInputs {
	name: string;
	phone: string;
	gender: "male" | "female";
	email: string;
	dob: Date;
	height: string;
	weight: string;
	bloodGroup: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-" | "O-";
	residence: string;
	type: "doctor" | "patient" | "admin";
}

const schema = yup.object().shape({
	email: yup.string().required(),
});

export default function EditHealthProfile() {
	const navigation = useNavigation();
	const { width, height } = Dimensions.get("screen");

	// const { phoneNumber, updateProfile } = useAuthStore((state) => ({
	// 	phoneNumber: state.phone,
	// 	updateProfile: state.updateProfile,
	// }));

	// const onSubmit = (data: CompleteProfileInputs) => {
	// 	console.log("Form data : ");
	// 	console.log(data);
	// 	completProfile({ ...data, phoneNumber, type: "patient" });

	// 	// TODO: to reconsider better way to store this server state
	// 	updateProfile({ ...data, phoneNumber, type: "patient" });
	// };

	//navigation attrib
	// TODO: on registering instead of navigating just update the global store which in turn will update the stack
	// to render

	//Date picker attrib

	// const { isLoading, mutate: completProfile } = useMutation(
	// 	createPatientProfile,
	// 	{
	// 		onError: (error, variables, context) => {
	// 			// An error happened!
	// 			console.log(`rolling back optimistic update with id `, error);
	// 		},
	// 		onSuccess: (data, variables, context) => {
	// 			// Boom baby!
	// 			console.log("created successfully ");
	// 		},
	// 	}
	// );

	// console.log("Phone number : 2 ", phoneNumber);

	return (
		<Box flex={1}>
			{/* <StatusBar translucent backgroundColor={colors.primary} /> */}
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
							Edit Health Profile
						</Text>
					</View>
					<ShowUserData />
				</Stack>
			</ScrollView>
		</Box>
	);
}

const ShowUserData = () => {
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date(1598051730000));

	const showDatepicker = () => {
		setShow(true);
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CompleteProfileInputs>({
		// resolver: yupResolver(schema),
	});

	const [userDetails, setUserDetails] = useState<PatientProfile[]>([]);

	const uid = auth().currentUser?.uid;

	useEffect(() => {
		const subscriber = firestore()
			.collection("patients")
			.where("uid", "==", uid)
			.onSnapshot((documentSnapshot) => {
				const shots = [
					...documentSnapshot.docs.map((doc) => ({ ...doc.data() })),
				];
				setUserDetails(shots as PatientProfile[]);
			});

		// Stop listening for updates when no longer required
		return () => subscriber();
	}, [uid]);

	return userDetails.map((data) => {
		return (
			<Stack alignItems="center">
				<Box bg="white" shadow={2} rounded={10} width="90%">
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
										field: { onChange, onBlur, value },
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
											placeholder={data.name}
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
										field: { onChange, onBlur, value },
									}) => (
										<Select
											variant="rounded"
											selectedValue={value}
											minWidth={200}
											accessibilityLabel="Gender"
											placeholder="Gender"
											onValueChange={(itemValue) =>
												onChange(itemValue)
											}
											_selectedItem={{
												bg: "cyan.600",
												endIcon: <CheckIcon size={4} />,
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
									defaultValue={data.gender}
								/>
							</Stack>

							<Spacer size={20} />

							<Stack>
								<Text>Date of Birth</Text>
								<Controller
									control={control}
									render={({
										field: { onChange, onBlur, value },
									}) => (
										<>
											<Input
												// keyboardType={""}
												value={moment(data.dob).format(
													"DD MMMM YYYY"
												)}
												variant="rounded"
												placeholder={moment(data.dob).format("DD MMMM YYYY")}
												style={{
													flex: 1,
												}}
												onFocus={showDatepicker}
												onChangeText={(value) => {}}
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
														onChange(currentDate);
													}}
													value={value}
													mode="date"
													display="spinner"
													maximumDate={new Date()}
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
								<Text>Email</Text>

								<Controller
									control={control}
									render={({
										field: { onChange, onBlur, value },
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
											keyboardType="email-address"
											placeholder={data.email}
											autoCapitalize={"none"}
										/>
									)}
									name="email"
									defaultValue=""
								/>
							</Stack>

							<Spacer size={20} />

							<Stack>
								<Text>Phone Number</Text>

								<Controller
									control={control}
									render={({
										field: { onChange, onBlur, value },
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
											placeholder={data.phoneNumber}
											keyboardType="phone-pad"
											autoCapitalize={"words"}
										/>
									)}
									name="phone"
									defaultValue={data.phoneNumber}
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
													onChangeText={(value) =>
														onChange(value)
													}
													outlineColor={
														errors.name ? "red" : ""
													}
													variant="rounded"
													placeholder={data.height}
													InputRightElement={
														<Text paddingRight={2}>
															cm
														</Text>
													}
												/>
											)}
											name="height"
											// rules={{ required: true }}
											defaultValue={data.height}
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
													onChangeText={(value) =>
														onChange(value)
													}
													outlineColor={
														errors.name ? "red" : ""
													}
													variant="rounded"
													placeholder={data.weight}
													InputRightElement={
														<Text paddingRight={2}>
															kg
														</Text>
													}
												/>
											)}
											name="weight"
											// rules={{ required: true }}
											defaultValue={data.weight}
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
										field: { onChange, onBlur, value },
									}) => (
										<Select
											variant="rounded"
											selectedValue={value}
											minWidth={200}
											accessibilityLabel="BloodGroup"
											placeholder={data.bloodGroup}
											onValueChange={(itemValue) =>
												onChange(itemValue)
											}
											_selectedItem={{
												bg: "cyan.600",
												endIcon: <CheckIcon size={4} />,
											}}
										>
											{bloodGroups.map((bloodGroup) => (
												<Select.Item
													label={bloodGroup.name}
													value={bloodGroup.name}
												/>
											))}
										</Select>
									)}
									name="bloodGroup"
									// rules={{ required: true }}
									defaultValue={data.bloodGroup}
								/>
							</Stack>

							<Spacer size={20} />

							<Stack>
								<Text>Location of Residence</Text>

								<Controller
									control={control}
									render={({
										field: { onChange, onBlur, value },
									}) => (
										<Select
											variant="rounded"
											selectedValue={value}
											minWidth={200}
											accessibilityLabel="Location"
											placeholder={data.residence}
											onValueChange={(itemValue) =>
												onChange(itemValue)
											}
											_selectedItem={{
												bg: "cyan.600",
												endIcon: <CheckIcon size={4} />,
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
									name="residence"
									// rules={{ required: true }}
									defaultValue={data.residence}
								/>
							</Stack>
						</Stack>
					</Stack>
					<Box mb={-6} paddingX={"5%"}>
						<Button
							onPress={() => {
								console.log(userDetails);
							}}
							// testID="button1"
							// disabled={isLoading}
							// isLoading={isLoading}
							borderRadius={20}
							_disabled={{
								backgroundColor: "#B0B3C7",
								color: "white",
							}}
							style={{
								backgroundColor: colors.primary,
							}}
							_text={{ color: "white" }}
						>
							Save Changes
						</Button>
					</Box>
				</Box>
			</Stack>
		);
	});
};
