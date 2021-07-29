import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AlternateContainer from "../../../src/components/containers/AlternateContainer";

describe("Base Container", () => {
	test("is it rendered appropriately", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<View>
							<AlternateContainer>
								<Text>Hi I am a test</Text>
							</AlternateContainer>
						</View>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("AlternateContainer")).toBeDefined();
	});
	test("functionality test", () => {
		expect(AlternateContainer("something")).toBeTruthy();
	});
});
