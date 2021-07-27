import React from 'react';
import { ControllerFormInput } from '../../../src/components/forms/inputs';

describe("Input field test", ()=>{
    test("is it rendered properly", ()=>{
        expect(ControllerFormInput("label")).toBeDefined();
    })
})