import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import FindFacilityView from './FindFacility'
import FindFacilityListView from './FindFacilityList'

import { Stack, NavKey } from './_navigator'

export default function MapFaciltyView() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name={NavKey.FindFacilityScreen} component={FindFacilityView} />
            <Stack.Screen name={NavKey.FindFacilityListScreen} component={FindFacilityListView} />
        </Stack.Navigator>
    )
}