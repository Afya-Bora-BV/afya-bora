import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Stack, ToastProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../../../src/internals/auth/context";
import { createStackNavigator } from "@react-navigation/stack";
import { render } from "@testing-library/react-native";
import {
	HomeNavKey,
	NavStack,
} from "../../../../src/views/Patient/Home/_navigator";
import NotificationScreen from "../../../../src/views/Patient/Home/Notification";

jest.mock(
	'../../../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
  );

describe("Patient Home Screen Test", () => {

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
											name={HomeNavKey.NotificationScreen}
											component={NotificationScreen}
											
										/>
									</NavStack.Navigator>
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("NotificationScreen")).toBeDefined();
	});
    test("functionality test", ()=>{
        expect(NotificationScreen()).toBeTruthy();
    })
    
});
