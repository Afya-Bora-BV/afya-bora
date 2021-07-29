import React from "react";
import Login from "../../../src/views/_Main/Login";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View, ToastProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "../../../src/internals/auth/context";

jest.mock(
	'../../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
  );

describe("Login", () => {
	const Stack = createStackNavigator();
	const queryClient = new QueryClient();

	test("does the screen render", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer >
						<ToastProvider>
							<AuthProvider>
								<QueryClientProvider client={queryClient}>
									<Stack.Screen
										name="Login"
										component={Login}
									/>
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

        expect(queryByTestId("PatientLoginScreen")).toBeDefined();
	});
});
