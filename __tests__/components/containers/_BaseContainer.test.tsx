import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import _BaseContainer from "../../../src/components/containers/_BaseContainer";

describe("Base Container", () => {
	test("is it rendered appropriately", () => {

		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<View>
							<_BaseContainer>
                                <Text>Hi I am a test</Text>
                            </_BaseContainer>
							
						</View>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(_BaseContainer("something")).toBeTruthy();
	});
});
