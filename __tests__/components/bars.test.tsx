import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, ToastProvider } from "native-base";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { CheckBox, FBLogo, Symptom, TimeSet } from "../../src/components/bars";
import { AuthProvider } from "../../src/internals/auth/context";

describe("Testing Bars", () => {
    
	const queryClient = new QueryClient();

	test("rendering components", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<ToastProvider>
							<AuthProvider>
								<QueryClientProvider client={queryClient}>
									<TimeSet time={"12435523412"} />
									<FBLogo/>
									<CheckBox item={"item1"}/>
									<Symptom symptom={"symptom1"}/>
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("TimeSet")).toBeTruthy;
		expect(queryByTestId("FBLogo")).toBeTruthy;
		expect(queryByTestId("CheckBox")).toBeTruthy;
		expect(queryByTestId("Symptom")).toBeTruthy;
	});

	test("CheckBox", () => {
		expect(CheckBox("item")).toBeDefined();
	});

	// test("FB Logo", () => {
	// 	expect(FBLogo()).toBeDefined();
	// });

	// test("Symptom", () => {
	// 	expect(Symptom("cough")).toBeDefined();

	// });
});
