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
import { HeaderwithBack } from "../components/header";
import { useNavigation } from "@react-navigation/native";
import { Symptom } from "../components/bars";
import { Spacer } from "../components/Spacer";
import { colors } from "../contants/colors";
import _ from "lodash";
import { TouchableOpacity, Alert, ToastAndroid } from "react-native";
import { toggleStringFromList } from "../utils";

const keySymptoms = [
	"Fever",
	"Vomitting",
	"Chest Pain",
	"Cough",
	"Ear Pain",
	"Skin Rash",
];

const PatientComplaint: React.FC = () => {
	const navigation = useNavigation();

	const [symptoms, setSymptoms] = useState<Array<string>>([]);

	const toggleKeySymptom = (symptom: string) => {
		const sy = toggleStringFromList(symptom, symptoms);
		setSymptoms(sy);
	};

	const handleBack = () => navigation.goBack();

	const handleSubmission = () => {
		Alert.alert(
			"Submit Request",
			"Please confirm that you have entered correct information.",
			[
				{ text: "Cancel", onPress: () => {} },
				{
					text: "Confirm",
					onPress: () => {
						navigation.navigate("Home");
						setTimeout(() =>
							ToastAndroid.show(
								"Appoinmtent request submitted!",
								3000
							)
						);
					},
				},
			]
		);
	};

	return (
		<ScrollView p={2} paddingTop={2}>
			<HeaderwithBack text="About Your Visit" onBackPress={handleBack} />

			<Spacer size={30} />

			<Stack alignItems="center">
				<Box bg="white" shadow={2} rounded="lg" width="90%">
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

				<Box bg="white" shadow={2} rounded="lg" width="90%">
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
				onPress={handleSubmission}
				rounded={20}
			>
				Book Appointment
			</Button>
			<Spacer size={10} />
		</ScrollView>
	);
};

export { PatientComplaint };
