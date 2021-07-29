import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Stack, ToastProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../../../../src/internals/auth/context";
import { createStackNavigator } from "@react-navigation/stack";
import { render } from "@testing-library/react-native";
import {
	HomeNavKey,
	NavStack,
} from "../../../../src/views/Patient/Home/_navigator";
import EditAppointment, { CalendarDay, listOfNextNMonths, MonthDropDown, nextNMonths, PickADateSection, PickATimeSection } from "../../../../src/views/Patient/Home/EditAppointment";

jest.mock(
	'../../../../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter',
  );

describe("Patient Home Screen Test", () => {
	const dummyAppointmentDetails = {
        id: "string",
        cid: "string,",
        pid: "string,",
        date: "string,",
        type: "offline",
        aboutVisit: {
            complaint: "string[]",
            symptoms: "string[]"
        },
        createdAt: {
            _seconds: "number",
            _nanoseconds: "number"
        },
        facility: {
            id: "string,",
            name: "string,",
            geopoint: {
                lat: "number",
                lng: "number"
            },
            address: "string,",
            rating: {
                stars: "string,",
                count: "string",
            }
        },
        patient: {
            name: "string,",
            bloodGroup: "string,",
            gender: "male",
        }
    }

	const Stack = createStackNavigator();

	const queryClient = new QueryClient();

	test("Is it being rendered?", () => {
		const { queryByTestId } = render(
			<SafeAreaProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<ToastProvider>
							<AuthProvider>
								<QueryClientProvider client={queryClient}>
									<NavStack.Navigator headerMode="none">
										<NavStack.Screen
											name={HomeNavKey.EditAppointment}
											component={EditAppointment}
											initialParams={dummyAppointmentDetails}
										/>
									</NavStack.Navigator>
								</QueryClientProvider>
							</AuthProvider>
						</ToastProvider>
					</NavigationContainer>
				</NativeBaseProvider>
			</SafeAreaProvider>
		);

		expect(queryByTestId("EditAppointment")).toBeDefined();
	});
    test("functionality test", ()=>{
        expect(PickADateSection("sth")).toBeTruthy();
        expect(PickATimeSection("sth")).toBeTruthy();
        expect(EditAppointment()).toBeTruthy();
        expect(MonthDropDown(new Date())).toBeTruthy();
        expect(CalendarDay(new Date())).toBeTruthy();
        expect(nextNMonths(2)).toBeTruthy();
        expect(listOfNextNMonths(2)).toBeTruthy();
    })
    
});
