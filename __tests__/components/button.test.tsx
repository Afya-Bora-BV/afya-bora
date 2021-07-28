import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import Button, {
	OutLineButton,
	PrimaryButton,
	SecondaryButton,
} from "../../src/components/button";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import button from "../../src/components/button";

describe("<Button/>", () => {
	test("is it rendered appropriately", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<View>
							<PrimaryButton text={"button1"} />
							<OutLineButton />
							<SecondaryButton />
							<Button />
						</View>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("button1")).toBeDefined();
	});

	test("functional test", () => {
		expect(PrimaryButton("buttonText")).toBeDefined();
		expect(OutLineButton()).toBeDefined();
		expect(SecondaryButton()).toBeDefined();
		expect(button()).toBeDefined();
	});
});
