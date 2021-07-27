import React from "react";
import { DropDown, Location, Number, SearchBar, TextInput } from "../../src/components/textFields";

describe("Text Fields", ()=>{
    test("text input", ()=>{
        expect(TextInput("someText")).toBeDefined();
    })
    test("Search bar", ()=>{
        expect(SearchBar()).toBeDefined();
    })
    test("Dropdown", ()=>{
        expect(DropDown("someText")).toBeDefined();
    })
    test("Location", ()=>{
        expect(Location("someText")).toBeDefined();
    })
    test("Number", ()=>{
        expect(Number(1234)).toBeDefined();
    })
})