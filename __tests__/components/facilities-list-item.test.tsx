import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import { FacilityListItem } from "../../src/components/facilities-list-item";

describe("Consultant List Item", () => {
	const dummyFacility = {
		name: "string;",
		address: "Uid;",
		rating: {
			count: "string;",
			stars: "male",
		},

		geopoint: "string;",
	};

	test("is it rendered", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<FacilityListItem facility={dummyFacility} />
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("FacilityListItem")).toBeDefined();
	});
	// test("functionality test", () => {
	// 	expect(FacilityListItem(dummyFacility, () => {})).toBeTruthy();
	// });
});
