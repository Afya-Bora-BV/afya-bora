import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider } from "native-base";
import Button, { PrimaryButton } from "../../src/components/button";
import { NavigationContainer } from "@react-navigation/native";

describe("<Button/>", () => {
	test("is it rendered appropriately", () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<NativeBaseProvider>
					<Button />
				</NativeBaseProvider>
			</NavigationContainer>
		);

		expect(getByTestId("button")).toBeDefined();
	});
});
