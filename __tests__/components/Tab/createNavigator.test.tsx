import React from 'react';
import createABSyleTabNavigator from '../../../src/components/Tab/createNavigator';

describe ("create navigator", ()=>{
    test("is the bottom tab created properly", ()=>{
        expect(createABSyleTabNavigator()).toBeDefined();
    })
})