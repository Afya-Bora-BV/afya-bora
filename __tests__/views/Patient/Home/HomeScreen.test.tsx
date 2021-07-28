import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Stack, ToastProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../../../src/internals/auth/context";
import Home from "../../../../src/views/Patient/Home/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { render } from "@testing-library/react-native";
import {
	HomeNavKey,
	NavStack,
} from "../../../../src/views/Patient/Home/_navigator";

describe("Patient Home Screen Test", () => {
	const dummyUser = {
		name: "string;",
		phone: "string;",
		gender: "male",
		dob: jest.fn(() => new Date("2020-05-13T12:33:37.000Z")),
		height: 12,
		weight: 12,
		bloodGroup: "O+",
		residence: "Dar",
		phoneNumber: "08124455922",
		type: "patient",
	};

	const Stack = createStackNavigator();

	const queryClient = new QueryClient();

	test("Is it being rendered?", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<ToastProvider>
							<AuthProvider>
								<QueryClientProvider client={queryClient}>
									<NavStack.Navigator headerMode="none">
										<NavStack.Screen
											name={HomeNavKey.HomeScreen}
											component={Home}
											initialParams={dummyUser}
										/>
									</NavStack.Navigator>
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("PatientLoginScreen")).toBeTruthy();
	});
});
