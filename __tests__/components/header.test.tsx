import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, ToastProvider } from "native-base";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { CheckBox, FBLogo, Symptom, TimeSet } from "../../src/components/bars";
import {
	Header,
	HeaderWith2Icons,
	HeaderwithBack,
	HeaderWithRText,
	HeaderWithSearch,
} from "../../src/components/header";
import { IconContainer } from "../../src/components/header";
import { AuthProvider } from "../../src/internals/auth/context";
import UserIcon from "../../src/assets/icons/User";
import { render } from "@testing-library/react-native";

describe("Testing Headers", () => {
	const queryClient = new QueryClient();
	test("Check if the Headers are rendered", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<ToastProvider>
							<AuthProvider>
								<QueryClientProvider client={queryClient}>
									<IconContainer>
										<UserIcon size={6} color="#561BB3" />
									</IconContainer>
									<Header text={"Heading"} />
									<HeaderwithBack text={"Heading"} />
									<HeaderWithSearch />
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);
		expect(queryByTestId("IconContainer")).toBeTruthy;
		expect(queryByTestId("Header")).toBeTruthy;
		expect(queryByTestId("HeaderwithBack")).toBeTruthy;
		expect(queryByTestId("HeaderwithSearch")).toBeTruthy;
	});
	test("Functionality test for the headers", () => {
		expect(IconContainer("someIcon")).toBeDefined();
        expect(Header("header")).toBeDefined();
		expect(HeaderwithBack("header")).toBeDefined();
		expect(HeaderWithSearch()).toBeDefined();
        expect(HeaderWithRText("header")).toBeDefined();
        expect(HeaderWith2Icons("header")).toBeDefined();
	});
});
