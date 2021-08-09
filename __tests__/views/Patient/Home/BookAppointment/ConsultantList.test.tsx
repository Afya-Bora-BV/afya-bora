import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Stack, ToastProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../../../../src/internals/auth/context";
import { createStackNavigator } from "@react-navigation/stack";
import { render } from "@testing-library/react-native";
import {
	NavKey,
} from "../../../../../src/views/Patient/Home/BookAppointment/_navigator";
import ConsultantsList, { getConsultants } from "../../../../../src/views/Patient/Home/ConsultantsList";

jest.mock(
	'../../../../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
  );

describe("Offline Consultants List Test", () => {

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
									<Stack.Navigator headerMode="none">
										<Stack.Screen
											name={NavKey.ConsultantListScreen}
											component={ConsultantsList}
										/>
									</Stack.Navigator>
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("ConsultantList")).toBeDefined();
	});

	test("functionality test", ()=>{
		expect(getConsultants()).toBeTruthy();
	})
});
