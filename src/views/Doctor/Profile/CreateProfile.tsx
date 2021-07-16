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
import React, { useState } from "react";
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


function friendlyFormatDate(timeStamp: Date | string | number) {
	const dateObj = new Date(timeStamp);

	const date = dateObj.getDate();
	const month = dateObj.getMonth();
	const year = dateObj.getFullYear();

	return `${date}-${month + 1}-${year}`;
}

//yup form control attrib
interface LoginFormInputs {
	name: string;
	gender: "male" | "female" | "other";
	dateOfBirth: Date;
}

const schema = yup.object().shape({
	email: yup.string().required(),
});

export default function CreateProfileScreen () {
	const navigation = useNavigation();
	const [gender, setGender] = React.useState();
	const { width, height } = Dimensions.get("screen");

	const [bloodGroup, setBloodGroup] = React.useState();
	const [location, setLocation] = React.useState();


	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: LoginFormInputs) => {
		console.log(data);
		nav();
	};

	//navigation attrib

	// TODO: on registering instead of navigating just update the global store which in turn will update the stack
	// to render
	const nav = () => {
		navigation.navigate("Home");
	};

	//Date picker attrib
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date(1598051730000));

	const showDatepicker = () => {
		setShow(true);
	};


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
							Create A Health Profile
						</Text>
					</View>
					{/* </Stack> */}
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
										// name="names"
										// rules={{ required: true }}
										// defaultValue=""
										/>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Gender</Text>

										<Select
											variant="rounded"
											selectedValue={gender}
											minWidth={200}
											accessibilityLabel="Gender"
											placeholder="Gender"
											onValueChange={(itemValue) =>
												setGender(itemValue)
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
											name="dateOfBirth"
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
															value={value}
															onBlur={onBlur}
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
												// name="names"
												// rules={{ required: true }}
												// defaultValue=""
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
															value={value}
															onBlur={onBlur}
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
												// name="names"
												// rules={{ required: true }}
												// defaultValue=""
												/>
											</Stack>
										</HStack>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Blood Group</Text>

										<Select
											variant="rounded"
											selectedValue={bloodGroup}
											minWidth={200}
											accessibilityLabel="BloodGroup"
											placeholder="BloodGroup"
											onValueChange={(itemValue) =>
												setBloodGroup(itemValue)
											}
											_selectedItem={{
												bg: "cyan.600",
												endIcon: <CheckIcon size={4} />,
											}}
										>
											<Select.Item
												label="AB+"
												value="AB+"
											/>
											<Select.Item label="O" value="O" />
										</Select>
									</Stack>

									<Spacer size={20} />

									<Stack>
										<Text>Location of Residence</Text>

										<Select
											variant="rounded"
											selectedValue={location}
											minWidth={200}
											accessibilityLabel="Location"
											placeholder="Location"
											onValueChange={(itemValue) =>
												setLocation(itemValue)
											}
											_selectedItem={{
												bg: "cyan.600",
												endIcon: <CheckIcon size={4} />,
											}}
										>
											<Select.Item
												label="Location1"
												value="Location1"
											/>
											<Select.Item
												label="Location2"
												value="Location2"
											/>
										</Select>
									</Stack>
								</Stack>
							</Stack>
							<Box mb={-6} paddingX={"5%"}>
								<Button
									onPress={nav}
									testID="button1"
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
};
