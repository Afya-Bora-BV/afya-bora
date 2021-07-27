import React from "react";
import CodeInput from "../../../src/components/forms/codeInput";

describe("verification code input test", () => {
	test("is it rendered properly", () => {
        expect(CodeInput("1234")).toBeDefined();
    });
});
