import React from "react";
import Login from "../../../src/views/_Main/Login";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import CreateProfileScreen from "../../../src/views/_Main/CreateProfile";

describe("Login", () => {
	const Stack = createStackNavigator();

	test("does the screen render", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<View>
							<Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
						</View>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);
	});
});
