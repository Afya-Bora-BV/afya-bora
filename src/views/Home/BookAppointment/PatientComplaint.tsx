import React, { useState } from "react";
import {
	Box,
	Button,
	Heading,
	HStack,
	Input,
	ScrollView,
	Stack,
	Text,
	TextArea,
} from "native-base";
import { HeaderwithBack } from "../../../components/header";
import { CommonActions, StackActions, useNavigation } from "@react-navigation/native";
import { Symptom } from "../../../components/bars";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../contants/colors";
import _ from "lodash";
import { TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { toggleStringFromList } from "../../../utils";

import { HomeNavKey as AuthNavKey } from "../";

const keySymptoms = [
	"Fever",
	"Vomitting",
	"Chest Pain",
	"Cough",
	"Ear Pain",
	"Skin Rash",
];

export function PatientComplaint () {
	const navigation = useNavigation();

	const [symptoms, setSymptoms] = useState<Array<string>>([]);

	const toggleKeySymptom = (symptom: string) => {
		const sy = toggleStringFromList(symptom, symptoms);
		setSymptoms(sy);
	};

	const onSubmit = () => {
		navigation.navigate(AuthNavKey.HomeScreen)

		// console.log(navigation.dangerouslyGetParent())

		// FIXME (ghmecc): This is platform-centric code, right? to mean
		//  that this code won't render on the web sio? any way to help with that?
		// ---------------------------------------- 
		// Alert.alert(
		// 	"Submit Request",
		// 	"Please confirm that you have entered correct information.",
		// 	[
		// 		{ text: "Cancel", onPress: () => {} },
		// 		{
		// 			text: "Confirm",
		// 			onPress: () => {
		// 				navigation.dispatch(
		// 					StackActions.popToTop()
		// 				);
		// 				setTimeout(() =>
		// 					ToastAndroid.show(
		// 						"Appoinmtent request submitted!",
		// 						3000
		// 					)
		// 				);
		// 			},
		// 		},
		// 	]
		// );
	};

	return (
		<ScrollView>
			<HeaderwithBack text="About Your Visit" onBackPress={navigation.goBack} />

			<Spacer size={30} />

			<Stack alignItems="center">
				<Box bg="white" shadow={2} rounded={10} width="90%">
					<Stack
						style={{
							paddingHorizontal: 20,
							paddingTop: 20,
							paddingBottom: 40,
						}}
					>
						<Text fontSize={"3xl"}>Symptoms</Text>

						<Text>Check any symptoms you have.</Text>

						<Spacer size={30} />

						<Stack space={2}>
							{_.chunk(keySymptoms, 2).map(
								([symptomA, symptomB], index) => (
									<HStack space={3}>
										<Box
											rounded="xl"
											borderColor="#ccc"
											bg={
												symptoms.includes(symptomA)
													? "#258FBE"
													: "#fff"
											}
											borderWidth={1}
											flex={1}
										>
											<TouchableOpacity
												style={{
													padding: 10,
													alignItems: "center",
													justifyContent: "center",
												}}
												onPress={() =>
													toggleKeySymptom(symptomA)
												}
											>
												<Text
													color={
														symptoms.includes(
															symptomA
														)
															? "#fff"
															: "#000"
													}
												>
													{symptomA}
												</Text>
											</TouchableOpacity>
										</Box>
										<Box
											rounded="xl"
											borderColor="#ccc"
											bg={
												symptoms.includes(symptomB)
													? "#258FBE"
													: "#fff"
											}
											borderWidth={1}
											flex={1}
										>
											<TouchableOpacity
												style={{
													padding: 10,
													alignItems: "center",
													justifyContent: "center",
												}}
												onPress={() =>
													toggleKeySymptom(symptomB)
												}
											>
												<Text
													color={
														symptoms.includes(
															symptomB
														)
															? "#fff"
															: "#000"
													}
												>
													{symptomB}
												</Text>
											</TouchableOpacity>
										</Box>
									</HStack>
								)
							)}
						</Stack>
					</Stack>
				</Box>

				<Spacer size={30} />

				<Box bg="white" shadow={2} rounded={10} width="90%">
					<Stack
						style={{
							paddingHorizontal: 20,
							paddingTop: 20,
							paddingBottom: 40,
						}}
					>
						<Text fontSize={"xl"}>
							What is your primary reason for seeing the doctor?
						</Text>

						<Box mt={2}>
							<TextArea
								autoCorrect={false}
								placeholder="Describe how you are feeling ..."
							/>
						</Box>
					</Stack>
				</Box>
			</Stack>
			<Button
				my={6}
				bg={colors.primary}
				onPress={onSubmit}
				rounded={20}
			>
				Book Appointment
			</Button>
			<Spacer size={10} />
		</ScrollView>
	);
};
