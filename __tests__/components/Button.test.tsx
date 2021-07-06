import React from "react";
import { render } from "@testing-library/react-native";
import { NativeBaseProvider } from 'native-base'
import Button from "../../src/components/button";

describe("<Button/>", () => {
    test("is it rendered appropriately", () => {
        const { getByTestId } = render(
            <NativeBaseProvider>
                <Button />
            </NativeBaseProvider>
        );

        expect(getByTestId("demo")).toBeDefined();
    });
});
