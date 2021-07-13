import React from "react";
import { render } from "@testing-library/react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginView from "../../src/views/Login";
import { NativeBaseProvider } from "native-base";

describe("PatientVisit Screen Works as expected", () => {
	const Stack = createStackNavigator();

	test("is it rendered appropriately", () => {
		const { getByTestId } = render(
			<LoginView />
		);

		expect(getByTestId("Login")).toBeDefined();
	});
});
