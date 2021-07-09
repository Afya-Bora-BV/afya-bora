import React, { Component } from "react";
import { ScrollView, Text } from "native-base";
import { HeaderwithBack } from "../components/header";
import { useNavigation } from "@react-navigation/native";

const PatientComplaint: React.FC = () => {
	const navigation = useNavigation();

	const handleBack = () => navigation.goBack();

	return (
		<ScrollView p={2} paddingTop={12}>
			<HeaderwithBack text="About Your Visit" onBackPress={handleBack} />

			<Text>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
				necessitatibus maiores labore deleniti at possimus optio
				doloremque consequuntur reprehenderit sit commodi vel nulla
				voluptatibus. Soluta aspernatur inventore velit. Blanditiis,
				porro.
			</Text>
		</ScrollView>
	);
};

export { PatientComplaint };
