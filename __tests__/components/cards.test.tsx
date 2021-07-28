import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import Cards, { HeroIllustrationContainer, ProfileCard, TopRatedSpecialists } from "../../src/components/cards";

describe("Cards Test", () => {
	test("are they rendered", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<Cards/>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

        expect (queryByTestId("cards")).toBeDefined();
	});

    test("are they functional", ()=>{
        expect(Cards()).toBeTruthy();
        expect(ProfileCard("someone", "132456", )).toBeTruthy();
        expect(HeroIllustrationContainer("something")).toBeTruthy();
        expect(TopRatedSpecialists("somone", "female")).toBeTruthy();
    })
});
