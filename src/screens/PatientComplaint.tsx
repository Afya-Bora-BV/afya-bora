import React, { Component } from "react";
import {
	Box,
	Button,
	Heading,
	HStack,
	Input,
	ScrollView,
	Stack,
	Text,
} from "native-base";
import { HeaderwithBack } from "../components/header";
import { useNavigation } from "@react-navigation/native";
import { Symptom } from "../components/bars";
import { Spacer } from "../components/Spacer";
import { colors } from "../contants/colors";

const PatientComplaint: React.FC = () => {
	const navigation = useNavigation();

	const handleBack = () => navigation.goBack();

	const handleNext = () => navigation.navigate("Home");

	return (
		<ScrollView p={2} paddingTop={12}>
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

						<Stack>
							<HStack
								justifyContent={"space-between"}
								flexWrap={"wrap"}
							>
								<Stack flex={1}>
									<Symptom symptom="Fever" />
								</Stack>

								<Spacer size={10} horizontal />

								<Stack flex={1}>
									<Symptom symptom="Vomitting" />
								</Stack>
							</HStack>

							<Spacer size={20} />

							<HStack
								justifyContent={"space-between"}
								flexWrap={"wrap"}
							>
								<Stack flex={1}>
									<Symptom symptom="Fever" />
								</Stack>

								<Spacer size={10} horizontal />

								<Stack flex={1}>
									<Symptom symptom="Vomitting" />
								</Stack>
							</HStack>

							<Spacer size={20} />

							<HStack
								justifyContent={"space-between"}
								flexWrap={"wrap"}
							>
								<Stack flex={1}>
									<Symptom symptom="Fever" />
								</Stack>

								<Spacer size={10} horizontal />

								<Stack flex={1}>
									<Symptom symptom="Vomitting" />
								</Stack>
							</HStack>
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
						<Text fontSize={"2xl"}>
							What is your primary reason for seeing the doctor?
						</Text>

						<Input
							variant={"outline"}
							placeholder="Type something"
							// isFullWidth
							multiline
							numberOfLines={4}
						/>
					</Stack>
				</Box>
			</Stack>
			<Button
				my={6}
				bg={colors.primary}
				onPress={handleNext}
				rounded={20}
			>
				Book Appointment
			</Button>
			<Spacer size={10} />
		</ScrollView>
	);
};

export { PatientComplaint };
