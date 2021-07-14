import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import {FindFacility as FindFacilityView} from './FindFacility' 
import {FindFacilityList as FindFacilityListView} from './FindFacilityList' 

const Stack = createStackNavigator()

export const NavKey = {
    FindFacilityScreen: "FindFacility",
    FindFacilityListScreen: "FindFacilityList",
}


export default function MapFaciltyView() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name={NavKey.FindFacilityScreen} component={FindFacilityView} />
            <Stack.Screen name={NavKey.FindFacilityListScreen} component={FindFacilityListView} />
        </Stack.Navigator>
    )
}