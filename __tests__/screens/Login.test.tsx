import React from "react";
import { render } from "@testing-library/react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../src/screens/Login";
import { NativeBaseProvider } from "native-base";

describe("PatientVisit Screen Works as expected", () => {
	const Stack = createStackNavigator();

	test("is it rendered appropriately", () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<NativeBaseProvider>
					<Stack.Navigator>
						<Stack.Screen name="Login" component={Login} />
					</Stack.Navigator>
				</NativeBaseProvider>
			</NavigationContainer>
		);

		expect(getByTestId("Login")).toBeDefined();
	});
});
