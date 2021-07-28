import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import IconContainer from "../../src/components/icon-container";

describe ("Does the icon container work", ()=>{
    test("render test", ()=>{
        const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<IconContainer/>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

        expect (queryByTestId("IconContainer")).toBeDefined();
    })
})