import React from "react";
import { render } from "@testing-library/react-native";

import { Spacer } from "../../src/components/Spacer";

describe("Spacer Component Works as expected", () => {
	test("is it rendered appropriately", () => {
		const { getByTestId } = render(<Spacer size={10} />);

		// TODO: @Raghav check to see what the convention naming for testID is
		expect(getByTestId("Spacer")).toBeDefined();
	});
});