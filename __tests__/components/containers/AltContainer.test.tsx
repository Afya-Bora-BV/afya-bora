import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider, Container, View, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import _BaseContainer from "../../../src/components/containers/_BaseContainer";
import AltContainer from "../../../src/components/containers/AltContainer";

describe("Alt Container", () => {
	test("is it rendered appropriately", () => {

		expect(AltContainer("something")).toBeTruthy();
	});
});
