import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, ToastProvider } from "native-base";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ControllerFormInput } from '../../../src/components/forms/inputs';
import { AuthProvider } from "../../../src/internals/auth/context";

describe("Input field test", ()=>{
    
	const queryClient = new QueryClient();

    test("is it rendered properly", ()=>{
        const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<ToastProvider>
							<AuthProvider>
								<QueryClientProvider client={queryClient}>
									<ControllerFormInput/>
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

        expect(queryByTestId("ControllerFormInput")).toBeDefined();

		expect(ControllerFormInput("label")).toBeTruthy();
    })
})