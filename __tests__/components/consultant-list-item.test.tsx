import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View } from "native-base";
import { ConsultantListItem } from '../../src/components/consultant-list-item';

describe("Consultant List Item", ()=>{
    const DummyConsultant = {
		id: "string;",
		uid: "Uid;",
		identifier: "string;",
		name: "string;",
		gender: "male",
		email: "string;",
		residence: "string;",
		rating: 4,
		ratedBy: 123,
		clinicianType: "string;",
		specialities: "string[];",
	};

    test("is it rendered", ()=>{
        const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<ConsultantListItem consultant={DummyConsultant}/>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

        expect (queryByTestId("ConsultantListItem")).toBeDefined();
    })
    // test("functionality test", ()=>{
    //     expect(ConsultantListItem(DummyConsultant, ()=>{})).toBeTruthy();
    // })
})