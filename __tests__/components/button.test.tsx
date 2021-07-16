import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import Button, { PrimaryButton } from "../../src/components/button";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../../src/internals/auth/context";
import { AppointmentTempoStoreProvider } from "../../src/internals/appointment/context";

describe("<Button/>", () => {
	test("is it rendered appropriately", () => {
		const queryClient = new QueryClient();

		const { getByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<View>
							<PrimaryButton text={"button1"} />
						</View>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(getByTestId("button1")).toBeDefined();
	});
});
