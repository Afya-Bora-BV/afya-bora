import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container } from "native-base";
import Button, { PrimaryButton } from "../../src/components/button";
import { NavigationContainer } from "@react-navigation/native";

describe("<Button/>", () => {
	test("is it rendered appropriately", () => {
		const { getByTestId } = render(
			<NativeBaseProvider>
				<Container>
					<PrimaryButton text={"button1"} />
				</Container>
			</NativeBaseProvider>
		);

		expect(getByTestId("button1")).toBeDefined();
	});
});
