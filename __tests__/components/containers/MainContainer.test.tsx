import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer, { ContainerHeader } from "../../../src/components/containers/MainContainer";

describe("Base Container", () => {
	test("is it rendered appropriately", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<View>
							<MainContainer>
								<Text>Hi I am a test</Text>
							</MainContainer>
						</View>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);
		expect(queryByTestId("MainContainer")).toBeDefined();
	});

	test("functionality test", () => {
		expect(MainContainer("something")).toBeTruthy();
        expect(ContainerHeader("something")).toBeTruthy();
	});
});
